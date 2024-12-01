import { isPlatform } from "@laserware/arcade";

import { getChordDisplay } from "../getChordDisplay.ts";
import { isChordPressed } from "../isChordPressed.ts";
import { EventButton, Key, Modifier, MouseButton } from "../types.ts";

vi.mock("@laserware/arcade");

describe("the isChordPressed function", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("returns true if requirements are met for keyboard events", () => {
    // prettier-ignore
    it.concurrent.each([
      {
        event: new KeyboardEvent("keydown", { key: "B", altKey: false, ctrlKey: false, metaKey: false, shiftKey: false }),
        chord: Key.LetterB,
        display: getChordDisplay(Key.LetterB),
      },
      {
        event: new KeyboardEvent("keydown", { key: "B", altKey: true, ctrlKey: false, metaKey: false, shiftKey: false }),
        chord: Modifier.Alt | Key.LetterB,
        display: getChordDisplay(Modifier.Alt | Key.LetterB),
      },
      {
        event: new KeyboardEvent("keydown", { key: "B", altKey: true, ctrlKey: false, metaKey: false, shiftKey: true }),
        chord: Modifier.Alt | Modifier.Shift | Key.LetterB,
        display: getChordDisplay(Modifier.Alt | Modifier.Shift | Key.LetterB),
      },
      {
        event: new KeyboardEvent("keydown", { key: "B", altKey: true, ctrlKey: true, metaKey: false, shiftKey: true }),
        chord: Modifier.Alt | Modifier.Ctrl | Modifier.Shift | Key.LetterB,
        display: getChordDisplay(Modifier.Alt | Modifier.Ctrl | Modifier.Shift | Key.LetterB),
      },
      {
        event: new KeyboardEvent("keydown", { key: "B", altKey: true, ctrlKey: true, metaKey: true, shiftKey: true }),
        chord: Modifier.Alt | Modifier.Cmd | Modifier.Ctrl | Modifier.Shift | Key.LetterB,
        display: getChordDisplay(Modifier.Alt | Modifier.Cmd | Modifier.Ctrl | Modifier.Shift | Key.LetterB),
      },
      {
        event: new KeyboardEvent("keydown", { key: "Unidentified", code: "KeyA", altKey: true, ctrlKey: false, metaKey: false, shiftKey: true }),
        chord: Modifier.Alt | Modifier.Shift | Key.LetterA,
        display: getChordDisplay(Modifier.Alt | Modifier.Shift | Key.LetterA),
      },
    ])("when $display is pressed and event matches", async ({ event, chord }) => {
      vi.mocked(isPlatform).mockImplementationOnce((platform: string) => platform === "mac");

      const result = isChordPressed(event, chord);

      expect(result).toBeTruthy();
    });
  });

  describe("returns false if requirements are not met for keyboard events", () => {
    // prettier-ignore
    it.concurrent.each([
      {
        event: new KeyboardEvent("keydown", { key: "B", altKey: true, ctrlKey: false, metaKey: false, shiftKey: false }),
        chord: Key.LetterB,
        display: getChordDisplay(Key.LetterB),
      },
      {
        event: new KeyboardEvent("keydown", { key: "B", altKey: false, ctrlKey: false, metaKey: false, shiftKey: true }),
        chord: Modifier.Alt | Key.LetterB,
        display: getChordDisplay(Modifier.Alt | Key.LetterB),
      },
      {
        event: new KeyboardEvent("keydown", { key: "B", altKey: false, ctrlKey: true, metaKey: false, shiftKey: true }),
        chord: Modifier.Alt | Modifier.Shift | Key.LetterB,
        display: getChordDisplay(Modifier.Alt | Modifier.Shift | Key.LetterB),
      },
      {
        event: new KeyboardEvent("keydown", { key: "B", altKey: true, ctrlKey: true, metaKey: false, shiftKey: true }),
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

      expect(result).toBeFalsy();
    });
  });

  describe("when the Command key is specified", () => {
    // prettier-ignore
    it.concurrent.each([
      // Command modifier:
      {
        event: new KeyboardEvent("keydown", { key: "A", altKey: false, ctrlKey: true, metaKey: false, shiftKey: false }),
        chord: Modifier.Cmd | Key.LetterA,
        display: getChordDisplay(Modifier.Cmd | Key.LetterA),
        expected: false,
      },
      {
        event: new KeyboardEvent("keydown", { key: "b", altKey: false, ctrlKey: false, metaKey: true, shiftKey: false }),
        chord: Modifier.Alt | Key.LetterB,
        display: getChordDisplay(Modifier.Alt | Key.LetterB),
        expected: false,
      },
      {
        event: new KeyboardEvent("keydown", { key: "C", altKey: false, ctrlKey: false, metaKey: true, shiftKey: false }),
        chord: Modifier.Cmd | Key.LetterC,
        display: getChordDisplay(Modifier.Cmd | Key.LetterC),
        expected: true,
      },

      // Ctrl modifier:
      {
        event: new KeyboardEvent("keydown", { key: "d", altKey: true, ctrlKey: false, metaKey: false, shiftKey: false }),
        chord: Modifier.Ctrl | Key.LetterD,
        display: getChordDisplay(Modifier.Ctrl | Key.LetterD),
        expected: false,
      },
      {
        event: new KeyboardEvent("keydown", { key: "E", altKey: false, ctrlKey: true, metaKey: false, shiftKey: false }),
        chord: Modifier.Alt | Key.LetterE,
        display: getChordDisplay(Modifier.Alt | Key.LetterE),
        expected: false,
      },
      {
        event: new KeyboardEvent("keydown", { key: "F", altKey: false, ctrlKey: true, metaKey: false, shiftKey: false }),
        chord: Modifier.Ctrl | Key.LetterF,
        display: getChordDisplay(Modifier.Ctrl | Key.LetterF),
        expected: true,
      },

      // Alt modifier
      {
        event: new KeyboardEvent("keydown", { key: "g", altKey: false, ctrlKey: true, metaKey: false, shiftKey: false }),
        chord: Modifier.Alt | Key.LetterG,
        display: getChordDisplay(Modifier.Alt | Key.LetterG),
        expected: false,
      },
      {
        event: new KeyboardEvent("keydown", { key: "H", altKey: true, ctrlKey: false, metaKey: false, shiftKey: false }),
        chord: Modifier.Ctrl | Key.LetterH,
        display: getChordDisplay(Modifier.Ctrl | Key.LetterH),
        expected: false,
      },
      {
        event: new KeyboardEvent("keydown", { key: "I", altKey: true, ctrlKey: false, metaKey: false, shiftKey: false }),
        chord: Modifier.Alt | Key.LetterI,
        display: getChordDisplay(Modifier.Alt | Key.LetterI),
        expected: true,
      },

      // Shift modifier
      {
        event: new KeyboardEvent("keydown", { key: "J", altKey: false, ctrlKey: false, metaKey: false, shiftKey: false }),
        chord: Modifier.Shift | Key.LetterJ,
        display: getChordDisplay(Modifier.Shift | Key.LetterJ),
        expected: false,
      },
      {
        event: new KeyboardEvent("keydown", { key: "M", altKey: false, ctrlKey: false, metaKey: false, shiftKey: true }),
        chord: Modifier.Ctrl | Key.LetterM,
        display: getChordDisplay(Modifier.Ctrl | Key.LetterM),
        expected: false,
      },
      {
        event: new KeyboardEvent("keydown", { key: "N", altKey: false, ctrlKey: false, metaKey: false, shiftKey: true }),
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

    // prettier-ignore
    const event = new KeyboardEvent("keydown", { altKey: true, ctrlKey: true, metaKey: false, shiftKey: true });

    const result = isChordPressed(event, Modifier.Ctrl | Modifier.Alt | Modifier.Shift);

    expect(result).toBeTruthy();
  });

  it("returns true if mouse buttons are specified and are clicked", () => {
    vi.mocked(isPlatform).mockImplementationOnce((platform: string) => platform === "mac");

    // prettier-ignore
    const event = new MouseEvent("mousedown", { altKey: true, ctrlKey: false, metaKey: false, shiftKey: false, buttons: EventButton.Left });

    const result = isChordPressed(event, Modifier.Alt | MouseButton.Left);

    expect(result).toBeTruthy();
  });

  describe("when checking for CmdOrCtrl", () => {
    it("clears the Cmd key on macOS", () => {
      vi.mocked(isPlatform).mockImplementationOnce((platform: string) => platform === "mac");

      // prettier-ignore
      const event = new KeyboardEvent("keydown", { altKey: false, ctrlKey: true, metaKey: true, shiftKey: false });

      const result = isChordPressed(event, Modifier.CmdOrCtrl | Modifier.Ctrl);

      expect(result).toBeTruthy();
    });

    it("clears the Ctrl key on Windows/Linux", () => {
      vi.mocked(isPlatform).mockImplementationOnce((platform: string) => platform !== "mac");

      // prettier-ignore
      const event = new KeyboardEvent("keydown", { altKey: false, ctrlKey: true, metaKey: false, shiftKey: false });

      const result = isChordPressed(event, Modifier.CmdOrCtrl);

      expect(result).toBeTruthy();
    });
  });

  it("handles Shift and Shift + Tab", () => {
    vi.mocked(isPlatform).mockImplementationOnce((platform: string) => platform === "mac");

    // prettier-ignore
    const event = new KeyboardEvent("keydown", { key: "Tab", altKey: false, ctrlKey: false, metaKey: false, shiftKey: true });

    const result = isChordPressed(event, Key.Tab, Modifier.Shift | Key.Tab);

    expect(result).toBeTruthy();
  });

  describe("returns true if requirements are met for mouse events", () => {
    // prettier-ignore
    it.concurrent.each([
      {
        event: new MouseEvent("keydown", { buttons: EventButton.Left, altKey: false, ctrlKey: false, metaKey: false, shiftKey: false }),
        chord: MouseButton.Left,
        display: getChordDisplay(MouseButton.Left),
      },
      {
        event: new MouseEvent("keydown", { buttons: EventButton.Right, altKey: true, ctrlKey: false, metaKey: false, shiftKey: false }),
        chord: Modifier.Alt | MouseButton.Right,
        display: getChordDisplay(Modifier.Alt | MouseButton.Right),
      },
      {
        event: new MouseEvent("keydown", { buttons: EventButton.Auxiliary, altKey: true, ctrlKey: false, metaKey: false, shiftKey: true }),
        chord: Modifier.Alt | Modifier.Shift | MouseButton.Auxiliary,
        display: getChordDisplay(Modifier.Alt | Modifier.Shift | MouseButton.Auxiliary),
      },
      {
        event: new MouseEvent("keydown", { buttons: EventButton.BrowserBack, altKey: true, ctrlKey: true, metaKey: false, shiftKey: true }),
        chord: Modifier.Alt | Modifier.Ctrl | Modifier.Shift | MouseButton.BrowserBack,
        display: getChordDisplay(Modifier.Alt | Modifier.Ctrl | Modifier.Shift | MouseButton.BrowserBack),
      },
      {
        event: new MouseEvent("keydown", { buttons: EventButton.BrowserForward, altKey: true, ctrlKey: true, metaKey: true, shiftKey: true }),
        chord: Modifier.Alt | Modifier.Cmd | Modifier.Ctrl | Modifier.Shift | MouseButton.BrowserForward,
        display: getChordDisplay(Modifier.Alt | Modifier.Cmd | Modifier.Ctrl | Modifier.Shift | MouseButton.BrowserForward),
      },
      {
        event: new MouseEvent("keydown", { buttons: EventButton.None, altKey: true, ctrlKey: false, metaKey: false, shiftKey: true }),
        chord: Modifier.Alt | Modifier.Shift | MouseButton.None,
        display: getChordDisplay(Modifier.Alt | Modifier.Shift | MouseButton.None),
      },
    ])("when $display is pressed and event matches", async ({ event, chord }) => {
      vi.mocked(isPlatform).mockImplementationOnce((platform: string) => platform === "mac");

      const result = isChordPressed(event, chord);

      expect(result).toBeTruthy();
    });
  });
});
