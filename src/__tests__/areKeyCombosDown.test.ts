import { areKeyCombosDown } from "../areKeyCombosDown.js";
import { Key, Modifier } from "../types.js";

describe("the areKeyCombosDown function", () => {
  it.concurrent.each([
    {
      modifiers: "none",
      event: new KeyboardEvent("keydown", { code: "KeyB" }),
      combo: Key.LetterB,
    },
    {
      modifiers: "Alt",
      event: new KeyboardEvent("keydown", { code: "KeyB", altKey: true }),
      combo: Modifier.Alt | Key.LetterB,
    },
    {
      modifiers: "Shift + Alt",
      event: new KeyboardEvent("keydown", { code: "KeyB", altKey: true, shiftKey: true }),
      combo: Modifier.Alt | Modifier.Shift | Key.LetterB,
    },
    // prettier-ignore
    {
      modifiers: "Shift + Alt + Ctrl",
      event: new KeyboardEvent("keydown", { code: "KeyB", altKey: true, ctrlKey: true, shiftKey: true }),
      combo: Modifier.Alt | Modifier.Ctrl | Modifier.Shift | Key.LetterB,
    },
    // prettier-ignore
    {
      modifiers: "Cmd + Shift + Alt + Ctrl",
      event: new KeyboardEvent("keydown", { code: "KeyB", altKey: true, ctrlKey: true, metaKey: true, shiftKey: true }),
      combo: Modifier.Alt | Modifier.Cmd | Modifier.Ctrl | Modifier.Shift | Key.LetterB,
    },
  ])("returns true when combo matches and modifiers are $modifiers", async ({ event, combo }) => {
    const result = areKeyCombosDown(event, combo);

    expect(result).toBe(true);
  });

  it.concurrent.each([
    {
      modifiers: "none",
      event: new KeyboardEvent("keydown", { code: "KeyB", altKey: true }),
      combo: Key.LetterB,
    },
    {
      modifiers: "Alt",
      event: new KeyboardEvent("keydown", { code: "KeyB", shiftKey: true }),
      combo: Modifier.Alt | Key.LetterB,
    },
    {
      modifiers: "Shift + Alt",
      event: new KeyboardEvent("keydown", { code: "KeyB", ctrlKey: true, shiftKey: true }),
      combo: Modifier.Alt | Modifier.Shift | Key.LetterB,
    },
    // prettier-ignore
    {
      modifiers: "Shift + Alt + Ctrl",
      event: new KeyboardEvent("keydown", { code: "KeyB", altKey: true, ctrlKey: true, shiftKey: true }),
      combo: Modifier.Alt | Modifier.Ctrl | Key.LetterB,
    },
    // prettier-ignore
    {
      modifiers: "Cmd + Shift + Alt + Ctrl",
      event: new KeyboardEvent("keydown", { code: "KeyB", altKey: true, ctrlKey: true, metaKey: true, shiftKey: true }),
      combo: Modifier.Alt | Modifier.Cmd | Key.LetterB,
    },
  ])(
    "returns false when combos do not match and modifiers are $modifiers",
    async ({ event, combo }) => {
      const result = areKeyCombosDown(event, combo);

      expect(result).toBe(false);
    },
  );

  it.concurrent.each([
    // Command modifier:
    {
      condition: "Command key is specified but not in event",
      event: new KeyboardEvent("keydown", { code: "KeyL", ctrlKey: true }),
      combo: Modifier.Cmd | Key.LetterL,
      expected: false,
    },
    {
      condition: "Command key is not specified but in event",
      event: new KeyboardEvent("keydown", { code: "KeyL", metaKey: true }),
      combo: Modifier.Alt | Key.LetterL,
      expected: false,
    },
    {
      condition: "Command key is specified and in event",
      event: new KeyboardEvent("keydown", { code: "KeyL", metaKey: true }),
      combo: Modifier.Cmd | Key.LetterL,
      expected: true,
    },

    // Ctrl modifier:
    {
      condition: "Ctrl key is specified but not in event",
      event: new KeyboardEvent("keydown", { code: "KeyL", altKey: true }),
      combo: Modifier.Ctrl | Key.LetterL,
      expected: false,
    },
    {
      condition: "Ctrl key is not specified but in event",
      event: new KeyboardEvent("keydown", { code: "KeyL", ctrlKey: true }),
      combo: Modifier.Alt | Key.LetterL,
      expected: false,
    },
    {
      condition: "Ctrl key is specified and in event",
      event: new KeyboardEvent("keydown", { code: "KeyL", ctrlKey: true }),
      combo: Modifier.Ctrl | Key.LetterL,
      expected: true,
    },

    // Alt modifier
    {
      condition: "Alt key is specified but not in event",
      event: new KeyboardEvent("keydown", { code: "KeyL", ctrlKey: true }),
      combo: Modifier.Alt | Key.LetterL,
      expected: false,
    },
    {
      condition: "Alt key is not specified but in event",
      event: new KeyboardEvent("keydown", { code: "KeyL", altKey: true }),
      combo: Modifier.Ctrl | Key.LetterL,
      expected: false,
    },
    {
      condition: "Alt key is specified and in event",
      event: new KeyboardEvent("keydown", { code: "KeyL", altKey: true }),
      combo: Modifier.Alt | Key.LetterL,
      expected: true,
    },

    // Shift modifier
    {
      condition: "Shift key is specified but not in event",
      event: new KeyboardEvent("keydown", { code: "KeyL", shiftKey: false }),
      combo: Modifier.Shift | Key.LetterL,
      expected: false,
    },
    {
      condition: "Shift key is not specified but in event",
      event: new KeyboardEvent("keydown", { code: "KeyL", shiftKey: true }),
      combo: Modifier.Ctrl | Key.LetterL,
      expected: false,
    },
    {
      condition: "Shift key is specified and in event",
      event: new KeyboardEvent("keydown", { code: "KeyL", shiftKey: true }),
      combo: Modifier.Shift | Key.LetterL,
      expected: true,
    },
  ])(
    "returns the $expected for condition $condition when combo is $combo",
    async ({ event, combo, expected }) => {
      const result = areKeyCombosDown(event, combo);

      expect(result).toBe(expected);
    },
  );

  it("returns true if only modifiers are specified with no code", () => {
    const event = new KeyboardEvent("keydown", { altKey: true, ctrlKey: true, shiftKey: true });

    const result = areKeyCombosDown(event, Modifier.Ctrl | Modifier.Alt | Modifier.Shift);

    expect(result).toBe(true);
  });
});
