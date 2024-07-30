import { getChordDisplay } from "../getChordDisplay.ts";
import { isChordPressed } from "../isChordPressed.ts";
import { Key, Modifier } from "../types.ts";

describe("the isChordPressed function", () => {
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
      const result = isChordPressed(event, chord);

      expect(result).toBe(false);
    });
  });

  describe("when the Command key is specified", () => {
    it.concurrent.each([
      // Command modifier:
      {
        name: "returns false if Command key is specified but not in event",
        event: new KeyboardEvent("keydown", { key: "L", ctrlKey: true }),
        chord: Modifier.Cmd | Key.LetterL,
        expected: false,
      },
      {
        name: "returns false if Command key is not specified but in event",
        event: new KeyboardEvent("keydown", { key: "L", metaKey: true }),
        chord: Modifier.Alt | Key.LetterL,
        expected: false,
      },
      {
        name: "returns true if Command key is specified and in event",
        event: new KeyboardEvent("keydown", { key: "L", metaKey: true }),
        chord: Modifier.Cmd | Key.LetterL,
        expected: true,
      },

      // Ctrl modifier:
      {
        name: "returns false if Ctrl key is specified but not in event",
        event: new KeyboardEvent("keydown", { key: "L", altKey: true }),
        chord: Modifier.Ctrl | Key.LetterL,
        expected: false,
      },
      {
        name: "returns false if Ctrl key is not specified but in event",
        event: new KeyboardEvent("keydown", { key: "L", ctrlKey: true }),
        chord: Modifier.Alt | Key.LetterL,
        expected: false,
      },
      {
        name: "returns true if Ctrl key is specified and in event",
        event: new KeyboardEvent("keydown", { key: "L", ctrlKey: true }),
        chord: Modifier.Ctrl | Key.LetterL,
        expected: true,
      },

      // Alt modifier
      {
        name: "returns false if Alt key is specified but not in event",
        event: new KeyboardEvent("keydown", { key: "L", ctrlKey: true }),
        chord: Modifier.Alt | Key.LetterL,
        expected: false,
      },
      {
        name: "returns false if Alt key is not specified but in event",
        event: new KeyboardEvent("keydown", { key: "L", altKey: true }),
        chord: Modifier.Ctrl | Key.LetterL,
        expected: false,
      },
      {
        name: "returns true if Alt key is specified and in event",
        event: new KeyboardEvent("keydown", { key: "L", altKey: true }),
        chord: Modifier.Alt | Key.LetterL,
        expected: true,
      },

      // Shift modifier
      {
        name: "returns false if Shift key is specified but not in event",
        event: new KeyboardEvent("keydown", { key: "L", shiftKey: false }),
        chord: Modifier.Shift | Key.LetterL,
        expected: false,
      },
      {
        name: "returns false if Shift key is not specified but in event",
        event: new KeyboardEvent("keydown", { key: "L", shiftKey: true }),
        chord: Modifier.Ctrl | Key.LetterL,
        expected: false,
      },
      {
        name: "returns true if Shift key is specified and in event",
        event: new KeyboardEvent("keydown", { key: "L", shiftKey: true }),
        chord: Modifier.Shift | Key.LetterL,
        expected: true,
      },
    ])("returns $expected when chord is $chord", async ({ event, chord, expected }) => {
      const result = isChordPressed(event, chord);

      expect(result).toBe(expected);
    });
  });

  it("returns true if only modifiers are specified with no key", () => {
    const event = new KeyboardEvent("keydown", {
      altKey: true,
      ctrlKey: true,
      shiftKey: true,
    });

    const result = isChordPressed(event, Modifier.Ctrl | Modifier.Alt | Modifier.Shift);

    expect(result).toBe(true);
  });
});
