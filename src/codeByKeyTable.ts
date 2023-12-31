import { Key } from "./types.js";

/**
 * Table of `Key` enum value to `code` mapping.
 */
export const codeByKeyTable: Record<Key, string> = {
  [Key.Backspace]: "Backspace",
  [Key.Tab]: "Tab",
  [Key.Clear]: "Clear",
  [Key.Enter]: "Enter",
  [Key.Escape]: "Escape",
  [Key.Space]: "Space",
  [Key.PageUp]: "PageUp",
  [Key.PageDown]: "PageDown",
  [Key.End]: "End",
  [Key.Home]: "Home",
  [Key.ArrowLeft]: "ArrowLeft",
  [Key.ArrowUp]: "ArrowUp",
  [Key.ArrowRight]: "ArrowRight",
  [Key.ArrowDown]: "ArrowDown",
  [Key.Insert]: "Insert",
  [Key.Delete]: "Delete",
  [Key.Number0]: "Digit0",
  [Key.Number1]: "Digit1",
  [Key.Number2]: "Digit2",
  [Key.Number3]: "Digit3",
  [Key.Number4]: "Digit4",
  [Key.Number5]: "Digit5",
  [Key.Number6]: "Digit6",
  [Key.Number7]: "Digit7",
  [Key.Number8]: "Digit8",
  [Key.Number9]: "Digit9",
  [Key.LetterA]: "KeyA",
  [Key.LetterB]: "KeyB",
  [Key.LetterC]: "KeyC",
  [Key.LetterD]: "KeyD",
  [Key.LetterE]: "KeyE",
  [Key.LetterF]: "KeyF",
  [Key.LetterG]: "KeyG",
  [Key.LetterH]: "KeyH",
  [Key.LetterI]: "KeyI",
  [Key.LetterJ]: "KeyJ",
  [Key.LetterK]: "KeyK",
  [Key.LetterL]: "KeyL",
  [Key.LetterM]: "KeyM",
  [Key.LetterN]: "KeyN",
  [Key.LetterO]: "KeyO",
  [Key.LetterP]: "KeyP",
  [Key.LetterQ]: "KeyQ",
  [Key.LetterR]: "KeyR",
  [Key.LetterS]: "KeyS",
  [Key.LetterT]: "KeyT",
  [Key.LetterU]: "KeyU",
  [Key.LetterV]: "KeyV",
  [Key.LetterW]: "KeyW",
  [Key.LetterX]: "KeyX",
  [Key.LetterY]: "KeyY",
  [Key.LetterZ]: "KeyZ",
  [Key.F1]: "F1",
  [Key.F2]: "F2",
  [Key.F3]: "F3",
  [Key.F4]: "F4",
  [Key.F5]: "F5",
  [Key.F6]: "F6",
  [Key.F7]: "F7",
  [Key.F8]: "F8",
  [Key.F9]: "F9",
  [Key.F10]: "F10",
  [Key.F11]: "F11",
  [Key.F12]: "F12",
  [Key.Semicolon]: "Semicolon",
  [Key.Equal]: "Equal",
  [Key.Comma]: "Comma",
  [Key.Minus]: "Minus",
  [Key.Period]: "Period",
  [Key.ForwardSlash]: "Slash",
  [Key.Backquote]: "Backquote",
  [Key.BracketLeft]: "BracketLeft",
  [Key.Backslash]: "Backslash",
  [Key.BracketRight]: "BracketRight",
  [Key.Quote]: "Quote",
};

export const keyByCodeTable = invertCodeByKeyTable();

function invertCodeByKeyTable(): Record<string, Key> {
  const keyByCodeTable: Record<string, Key> = {};

  for (const [key, code] of Object.entries(codeByKeyTable)) {
    keyByCodeTable[code] = Number(key) as Key;
  }

  return keyByCodeTable;
}
