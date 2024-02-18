import { isChordPressed } from "../isChordPressed.js";
import { Key, Modifier } from "../types.js";

describe.skip("the isKeyComboDown function", () => {
  describe("returns true if requirements are met", () => {
    // prettier-ignore
    const testCases = [
      {
        name: "for a single combo with no modifiers",
        event: new KeyboardEvent("keydown", { key: "B" }),
        combo: Key.LetterB,
      },
      {
        name: "for a single combo with Alt modifier",
        event: new KeyboardEvent("keydown", { key: "B", altKey: true }),
        combo: Modifier.Alt | Key.LetterB,
      },
      {
        name: "for a single combo with Alt + Shift modifiers",
        event: new KeyboardEvent("keydown", { key: "B", altKey: true, shiftKey: true }),
        combo: Modifier.Alt | Modifier.Shift | Key.LetterB,
      },
      {
        name: "for a single combo with Alt + Ctrl + Shift modifiers",
        event: new KeyboardEvent("keydown", { key: "B", altKey: true, ctrlKey: true, shiftKey: true }),
        combo: Modifier.Alt | Modifier.Ctrl | Modifier.Shift | Key.LetterB,
      },
      {
        name: "for a single combo with Alt + Command + Ctrl + Shift modifiers",
        event: new KeyboardEvent("keydown", { key: "B", altKey: true, ctrlKey: true, metaKey: true, shiftKey: true }),
        combo: Modifier.Alt | Modifier.Cmd | Modifier.Ctrl | Modifier.Shift | Key.LetterB,
      },
    ];

    for (const { name, event, combo } of testCases) {
      test.concurrent(name, async () => {
        const result = isChordPressed(event, combo);

        expect(result).toBe(true);
      });
    }
  });

  describe("returns false if requirements are not met", () => {
    // prettier-ignore
    const testCases = [
      {
        name: "for a single combo with no modifiers",
        event: new KeyboardEvent("keydown", { key: "B", altKey: true }),
        combo: Key.LetterB,
      },
      {
        name: "for a single combo with Alt modifier",
        event: new KeyboardEvent("keydown", { key: "B", shiftKey: true }),
        combo: Modifier.Alt | Key.LetterB,
      },
      {
        name: "for a single combo with Alt + Shift modifiers",
        event: new KeyboardEvent("keydown", { key: "B", ctrlKey: true, shiftKey: true }),
        combo: Modifier.Alt | Modifier.Shift | Key.LetterB,
      },
      {
        name: "for a single combo with Alt + Ctrl + Shift modifiers",
        event: new KeyboardEvent("keydown", { key: "B", altKey: true, ctrlKey: true, shiftKey: true }),
        combo: Modifier.Alt | Modifier.Ctrl | Key.LetterB,
      },
      {
        name: "for a single combo with Alt + Command + Ctrl + Shift modifiers",
        event: new KeyboardEvent("keydown", { key: "B", altKey: true, ctrlKey: true, metaKey: true, shiftKey: true }),
        combo: Modifier.Alt | Modifier.Cmd | Key.LetterB,
      },
    ];

    for (const { name, event, combo } of testCases) {
      test.concurrent(name, async () => {
        const result = isChordPressed(event, combo);

        expect(result).toBe(false);
      });
    }
  });

  describe("returns the correct value for modifier", () => {
    const testCases = [
      // Command modifier:
      {
        name: "returns false if Command key is specified but not in event",
        event: new KeyboardEvent("keydown", { key: "L", ctrlKey: true }),
        combo: Modifier.Cmd | Key.LetterL,
        expected: false,
      },
      {
        name: "returns false if Command key is not specified but in event",
        event: new KeyboardEvent("keydown", { key: "L", metaKey: true }),
        combo: Modifier.Alt | Key.LetterL,
        expected: false,
      },
      {
        name: "returns true if Command key is specified and in event",
        event: new KeyboardEvent("keydown", { key: "L", metaKey: true }),
        combo: Modifier.Cmd | Key.LetterL,
        expected: true,
      },

      // Ctrl modifier:
      {
        name: "returns false if Ctrl key is specified but not in event",
        event: new KeyboardEvent("keydown", { key: "L", altKey: true }),
        combo: Modifier.Ctrl | Key.LetterL,
        expected: false,
      },
      {
        name: "returns false if Ctrl key is not specified but in event",
        event: new KeyboardEvent("keydown", { key: "L", ctrlKey: true }),
        combo: Modifier.Alt | Key.LetterL,
        expected: false,
      },
      {
        name: "returns true if Ctrl key is specified and in event",
        event: new KeyboardEvent("keydown", { key: "L", ctrlKey: true }),
        combo: Modifier.Ctrl | Key.LetterL,
        expected: true,
      },

      // Alt modifier
      {
        name: "returns false if Alt key is specified but not in event",
        event: new KeyboardEvent("keydown", { key: "L", ctrlKey: true }),
        combo: Modifier.Alt | Key.LetterL,
        expected: false,
      },
      {
        name: "returns false if Alt key is not specified but in event",
        event: new KeyboardEvent("keydown", { key: "L", altKey: true }),
        combo: Modifier.Ctrl | Key.LetterL,
        expected: false,
      },
      {
        name: "returns true if Alt key is specified and in event",
        event: new KeyboardEvent("keydown", { key: "L", altKey: true }),
        combo: Modifier.Alt | Key.LetterL,
        expected: true,
      },

      // Shift modifier
      {
        name: "returns false if Shift key is specified but not in event",
        event: new KeyboardEvent("keydown", { key: "L", shiftKey: false }),
        combo: Modifier.Shift | Key.LetterL,
        expected: false,
      },
      {
        name: "returns false if Shift key is not specified but in event",
        event: new KeyboardEvent("keydown", { key: "L", shiftKey: true }),
        combo: Modifier.Ctrl | Key.LetterL,
        expected: false,
      },
      {
        name: "returns true if Shift key is specified and in event",
        event: new KeyboardEvent("keydown", { key: "L", shiftKey: true }),
        combo: Modifier.Shift | Key.LetterL,
        expected: true,
      },
    ];

    for (const { name, event, combo, expected } of testCases) {
      test.concurrent(name, async () => {
        const result = isChordPressed(event, combo);

        expect(result).toBe(expected);
      });
    }
  });

  test("returns true if only modifiers are specified with no code", () => {
    const event = new KeyboardEvent("keydown", { altKey: true, ctrlKey: true, shiftKey: true });

    const result = isChordPressed(event, Modifier.Ctrl | Modifier.Alt | Modifier.Shift);

    expect(result).toBe(true);
  });
});
