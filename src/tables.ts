import { Key } from "./types.ts";

/**
 * Table of `Key` enum value to `event.key` mapping.
 */
export const eventKeyByKeyEnumTable: Record<Key, string> = {
  [Key.Backspace]: "Backspace",
  [Key.Tab]: "Tab",
  [Key.Clear]: "Clear",
  [Key.Enter]: "Enter",
  [Key.Escape]: "Escape",
  [Key.Space]: " ",
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
  [Key.Number0]: "0",
  [Key.Number1]: "1",
  [Key.Number2]: "2",
  [Key.Number3]: "3",
  [Key.Number4]: "4",
  [Key.Number5]: "5",
  [Key.Number6]: "6",
  [Key.Number7]: "7",
  [Key.Number8]: "8",
  [Key.Number9]: "9",
  [Key.LetterA]: "A",
  [Key.LetterB]: "B",
  [Key.LetterC]: "C",
  [Key.LetterD]: "D",
  [Key.LetterE]: "E",
  [Key.LetterF]: "F",
  [Key.LetterG]: "G",
  [Key.LetterH]: "H",
  [Key.LetterI]: "I",
  [Key.LetterJ]: "J",
  [Key.LetterK]: "K",
  [Key.LetterL]: "L",
  [Key.LetterM]: "M",
  [Key.LetterN]: "N",
  [Key.LetterO]: "O",
  [Key.LetterP]: "P",
  [Key.LetterQ]: "Q",
  [Key.LetterR]: "R",
  [Key.LetterS]: "S",
  [Key.LetterT]: "T",
  [Key.LetterU]: "U",
  [Key.LetterV]: "V",
  [Key.LetterW]: "W",
  [Key.LetterX]: "X",
  [Key.LetterY]: "Y",
  [Key.LetterZ]: "Z",
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
  [Key.Semicolon]: ";",
  [Key.Equal]: "=",
  [Key.Comma]: ",",
  [Key.Minus]: "-",
  [Key.Period]: ".",
  [Key.ForwardSlash]: "/",
  [Key.Backquote]: "`",
  [Key.BracketLeft]: "[",
  [Key.Backslash]: "\\",
  [Key.BracketRight]: "]",
  [Key.Quote]: `"`,
};

export const keyEnumByEventKeyTable = invertEventKeyByKeyEnumTable();

function invertEventKeyByKeyEnumTable(): Record<string, Key> {
  const keyEnumByEventKeyTable: Record<string, Key> = {};

  for (const [keyEnum, eventKey] of Object.entries(eventKeyByKeyEnumTable)) {
    keyEnumByEventKeyTable[eventKey] = Number(keyEnum) as Key;
  }

  return keyEnumByEventKeyTable;
}
