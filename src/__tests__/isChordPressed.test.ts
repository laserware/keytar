import { isPlatform } from "@laserware/arcade";

import { getChordDisplay } from "../getChordDisplay.ts";
import { isChordPressed } from "../isChordPressed.ts";
import { EventButton, Key, Modifier, MouseButton } from "../types.ts";

vi.mock("@laserware/arcade");

describe("the isChordPressed function", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("returns true if requirements are met", () => {
    // prettier-ignore
    it.concurrent.each([
      {
        event: new KeyboardEvent("keydown", { key: "B" }),
        chord: Key.LetterB,
        display: getChordDisplay(Key.LetterB),
      },
      {
        event: new KeyboardEvent("keydown", { key: "B", altKey: true }),
        chord: Modifier.Alt | Key.LetterB,
        display: getChordDisplay(Modifier.Alt | Key.LetterB),
      },
      {
        event: new KeyboardEvent("keydown", { key: "B", altKey: true, shiftKey: true }),
        chord: Modifier.Alt | Modifier.Shift | Key.LetterB,
        display: getChordDisplay(Modifier.Alt | Modifier.Shift | Key.LetterB),
      },
      {
        event: new KeyboardEvent("keydown", { key: "B", altKey: true, ctrlKey: true, shiftKey: true }),
        chord: Modifier.Alt | Modifier.Ctrl | Modifier.Shift | Key.LetterB,
        display: getChordDisplay(Modifier.Alt | Modifier.Ctrl | Modifier.Shift | Key.LetterB),
      },
      {
        event: new KeyboardEvent("keydown", { key: "B", altKey: true, ctrlKey: true, metaKey: true, shiftKey: true }),
        chord: Modifier.Alt | Modifier.Cmd | Modifier.Ctrl | Modifier.Shift | Key.LetterB,
        display: getChordDisplay(Modifier.Alt | Modifier.Cmd | Modifier.Ctrl | Modifier.Shift | Key.LetterB),
      },
    ])("when $display is pressed and event matches", async ({ event, chord }) => {
      vi.mocked(isPlatform).mockImplementationOnce((platform: string) => platform === "mac");

      const result = isChordPressed(event, chord);

      expect(result).toBe(true);
    });
  });

  describe("returns false if requirements are not met", () => {
    // prettier-ignore
    it.concurrent.each([
      {
        event: new KeyboardEvent("keydown", { key: "B", altKey: true }),
        chord: Key.LetterB,
        display: getChordDisplay(Key.LetterB),
      },
      {
        event: new KeyboardEvent("keydown", { key: "B", shiftKey: true }),
        chord: Modifier.Alt | Key.LetterB,
        display: getChordDisplay(Modifier.Alt | Key.LetterB),
      },
      {
        event: new KeyboardEvent("keydown", { key: "B", ctrlKey: true, shiftKey: true }),
        chord: Modifier.Alt | Modifier.Shift | Key.LetterB,
        display: getChordDisplay(Modifier.Alt | Modifier.Shift | Key.LetterB),
      },
      {
        event: new KeyboardEvent("keydown", { key: "B", altKey: true, ctrlKey: true, shiftKey: true }),
        chord: Modifier.Alt | Modifier.Ctrl | Key.LetterB,
        display: getChordDisplay(Modifier.Alt | Modifier.Ctrl | Key.LetterB),
      },
      {
        event: new KeyboardEvent("keydown", { key: "B", altKey: true, ctrlKey: true, metaKey: true, shiftKey: true }),
        chord: Modifier.Alt | Modifier.Cmd | Key.LetterB,
        display: getChordDisplay(Modifier.Alt | Modifier.Cmd | Key.LetterB),
      },
    ])("when $display is pressed and event does not match", async ({ event, chord })=> {
      vi.mocked(isPlatform).mockImplementationOnce((platform: string) => platform === "mac");

      const result = isChordPressed(event, chord);

      expect(result).toBe(false);
    });
  });

  describe("when the Command key is specified", () => {
    it.concurrent.each([
      // Command modifier:
      {
        event: new KeyboardEvent("keydown", { key: "A", ctrlKey: true }),
        chord: Modifier.Cmd | Key.LetterA,
        display: getChordDisplay(Modifier.Cmd | Key.LetterA),
        expected: false,
      },
      {
        event: new KeyboardEvent("keydown", { key: "b", metaKey: true }),
        chord: Modifier.Alt | Key.LetterB,
        display: getChordDisplay(Modifier.Alt | Key.LetterB),
        expected: false,
      },
      {
        event: new KeyboardEvent("keydown", { key: "C", metaKey: true }),
        chord: Modifier.Cmd | Key.LetterC,
        display: getChordDisplay(Modifier.Cmd | Key.LetterC),
        expected: true,
      },

      // Ctrl modifier:
      {
        event: new KeyboardEvent("keydown", { key: "d", altKey: true }),
        chord: Modifier.Ctrl | Key.LetterD,
        display: getChordDisplay(Modifier.Ctrl | Key.LetterD),
        expected: false,
      },
      {
        event: new KeyboardEvent("keydown", { key: "E", ctrlKey: true }),
        chord: Modifier.Alt | Key.LetterE,
        display: getChordDisplay(Modifier.Alt | Key.LetterE),
        expected: false,
      },
      {
        event: new KeyboardEvent("keydown", { key: "F", ctrlKey: true }),
        chord: Modifier.Ctrl | Key.LetterF,
        display: getChordDisplay(Modifier.Ctrl | Key.LetterF),
        expected: true,
      },

      // Alt modifier
      {
        event: new KeyboardEvent("keydown", { key: "g", ctrlKey: true }),
        chord: Modifier.Alt | Key.LetterG,
        display: getChordDisplay(Modifier.Alt | Key.LetterG),
        expected: false,
      },
      {
        event: new KeyboardEvent("keydown", { key: "H", altKey: true }),
        chord: Modifier.Ctrl | Key.LetterH,
        display: getChordDisplay(Modifier.Ctrl | Key.LetterH),
        expected: false,
      },
      {
        event: new KeyboardEvent("keydown", { key: "I", altKey: true }),
        chord: Modifier.Alt | Key.LetterI,
        display: getChordDisplay(Modifier.Alt | Key.LetterI),
        expected: true,
      },

      // Shift modifier
      {
        event: new KeyboardEvent("keydown", { key: "J", shiftKey: false }),
        chord: Modifier.Shift | Key.LetterJ,
        display: getChordDisplay(Modifier.Shift | Key.LetterJ),
        expected: false,
      },
      {
        event: new KeyboardEvent("keydown", { key: "M", shiftKey: true }),
        chord: Modifier.Ctrl | Key.LetterM,
        display: getChordDisplay(Modifier.Ctrl | Key.LetterM),
        expected: false,
      },
      {
        event: new KeyboardEvent("keydown", { key: "N", shiftKey: true }),
        chord: Modifier.Shift | Key.LetterN,
        display: getChordDisplay(Modifier.Shift | Key.LetterN),
        expected: true,
      },
    ])(
      "returns $expected when $display ($chord) is pressed",
      async ({ event, chord, expected }) => {
        vi.mocked(isPlatform).mockImplementationOnce((platform: string) => platform === "mac");

        const result = isChordPressed(event, chord);

        expect(result).toBe(expected);
      },
    );
  });

  it("returns true if only modifiers are specified with no key", () => {
    vi.mocked(isPlatform).mockImplementationOnce((platform: string) => platform === "mac");

    const event = new KeyboardEvent("keydown", {
      altKey: true,
      ctrlKey: true,
      shiftKey: true,
    });

    const result = isChordPressed(event, Modifier.Ctrl | Modifier.Alt | Modifier.Shift);

    expect(result).toBe(true);
  });

  it("returns true if mouse buttons are specified and are clicked", () => {
    vi.mocked(isPlatform).mockImplementationOnce((platform: string) => platform === "mac");

    const event = new MouseEvent("mousedown", { altKey: true, buttons: EventButton.Left });

    const result = isChordPressed(event, Modifier.Alt | MouseButton.Left);

    expect(result).toBe(true);
  });

  describe("when checking for CmdOrCtrl", () => {
    it("clears the Cmd key on macOS", () => {
      vi.mocked(isPlatform).mockImplementationOnce((platform: string) => platform === "mac");

      const event = new KeyboardEvent("keydown", {
        ctrlKey: true,
        metaKey: true,
      });

      const result = isChordPressed(event, Modifier.CmdOrCtrl | Modifier.Ctrl);

      expect(result).toBe(true);
    });

    it("clears the Ctrl key on Windows/Linux", () => {
      vi.mocked(isPlatform).mockImplementationOnce((platform: string) => platform !== "mac");

      const event = new KeyboardEvent("keydown", { ctrlKey: true });

      const result = isChordPressed(event, Modifier.CmdOrCtrl);

      expect(result).toBe(true);
    });
  });

  it("handles Shift and Shift + Tab", () => {
    vi.mocked(isPlatform).mockImplementationOnce((platform: string) => platform === "mac");

    const event = new KeyboardEvent("keydown", { key: "Tab", shiftKey: true });

    const result = isChordPressed(event, Key.Tab, Modifier.Shift | Key.Tab);

    expect(result).toBe(true);
  });
});
