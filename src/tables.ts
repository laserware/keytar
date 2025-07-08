import { isPlatform } from "@laserware/arcade";

import {
  type Chord,
  Key,
  type KeyModifierState,
  Modifier,
  MouseButton,
  MouseEventButton,
} from "./types.js";

/**
 * Table for looking up the {@linkcode Modifier} that corresponds to a modifier
 * event property (e.g. `event.altKey`).
 *
 * @internal
 */
export const modifierByModifierStatusTable = new Map<
  KeyModifierState,
  Modifier
>([
  ["altKey", Modifier.Alt],
  ["ctrlKey", Modifier.Ctrl],
  ["metaKey", Modifier.Cmd],
  ["shiftKey", Modifier.Shift],
]);

/**
 * Table for looking up the {@linkcode MouseButton} that corresponds to the
 * [`event.buttons` property](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons)
 * on a [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)
 * (represented by {@linkcode MouseEventButton}).
 *
 * @internal
 */
export const mouseButtonByMouseEventButtonTable = new Map<
  MouseEventButton,
  MouseButton
>([
  [MouseEventButton.None, MouseButton.None],
  [MouseEventButton.Left, MouseButton.Left],
  [MouseEventButton.Right, MouseButton.Right],
  [MouseEventButton.Auxiliary, MouseButton.Auxiliary],
  [MouseEventButton.BrowserBack, MouseButton.BrowserBack],
  [MouseEventButton.BrowserForward, MouseButton.BrowserForward],
]);

/**
 * Table for looking up the [`event.key` property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
 * value that corresponds to a {@linkcode Key} value.
 *
 * @internal
 */
export const eventKeyByKeyEnumTable = new Map<Key, string>([
  [Key.Backspace, "Backspace"],
  [Key.Tab, "Tab"],
  [Key.Clear, "Clear"],
  [Key.Enter, "Enter"],
  [Key.Pause, "Pause"],
  [Key.CapsLock, "CapsLock"],
  [Key.Escape, "Escape"],
  [Key.Space, " "],
  [Key.PageUp, "PageUp"],
  [Key.PageDown, "PageDown"],
  [Key.End, "End"],
  [Key.Home, "Home"],
  [Key.ArrowLeft, "ArrowLeft"],
  [Key.ArrowUp, "ArrowUp"],
  [Key.ArrowRight, "ArrowRight"],
  [Key.ArrowDown, "ArrowDown"],
  [Key.Insert, "Insert"],
  [Key.Delete, "Delete"],
  [Key.Help, "Help"],
  [Key.Number0, "0"],
  [Key.Number1, "1"],
  [Key.Number2, "2"],
  [Key.Number3, "3"],
  [Key.Number4, "4"],
  [Key.Number5, "5"],
  [Key.Number6, "6"],
  [Key.Number7, "7"],
  [Key.Number8, "8"],
  [Key.Number9, "9"],
  [Key.LetterA, "A"],
  [Key.LetterB, "B"],
  [Key.LetterC, "C"],
  [Key.LetterD, "D"],
  [Key.LetterE, "E"],
  [Key.LetterF, "F"],
  [Key.LetterG, "G"],
  [Key.LetterH, "H"],
  [Key.LetterI, "I"],
  [Key.LetterJ, "J"],
  [Key.LetterK, "K"],
  [Key.LetterL, "L"],
  [Key.LetterM, "M"],
  [Key.LetterN, "N"],
  [Key.LetterO, "O"],
  [Key.LetterP, "P"],
  [Key.LetterQ, "Q"],
  [Key.LetterR, "R"],
  [Key.LetterS, "S"],
  [Key.LetterT, "T"],
  [Key.LetterU, "U"],
  [Key.LetterV, "V"],
  [Key.LetterW, "W"],
  [Key.LetterX, "X"],
  [Key.LetterY, "Y"],
  [Key.LetterZ, "Z"],
  [Key.F1, "F1"],
  [Key.F2, "F2"],
  [Key.F3, "F3"],
  [Key.F4, "F4"],
  [Key.F5, "F5"],
  [Key.F6, "F6"],
  [Key.F7, "F7"],
  [Key.F8, "F8"],
  [Key.F9, "F9"],
  [Key.F10, "F10"],
  [Key.F11, "F11"],
  [Key.F12, "F12"],
  [Key.NumLock, "NumLock"],
  [Key.ScrollLock, "ScrollLock"],
  [Key.Semicolon, ";"],
  [Key.Equal, "="],
  [Key.Comma, ","],
  [Key.Minus, "-"],
  [Key.Period, "."],
  [Key.ForwardSlash, "/"],
  [Key.Backquote, "`"],
  [Key.BracketLeft, "["],
  [Key.Backslash, "\\"],
  [Key.BracketRight, "]"],
  [Key.Quote, `"`],
]);

/**
 * Table for looking up the {@linkcode Key} value that corresponds to the
 * [`event.key` property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
 * value.
 *
 * @internal
 */
export const keyEnumByEventKeyTable = new Map<string, Key>([
  ["Backspace", Key.Backspace],
  ["Tab", Key.Tab],
  ["Clear", Key.Clear],
  ["Enter", Key.Enter],
  ["Pause", Key.Pause],
  ["CapsLock", Key.CapsLock],
  ["Escape", Key.Escape],
  [" ", Key.Space],
  ["PageUp", Key.PageUp],
  ["PageDown", Key.PageDown],
  ["End", Key.End],
  ["Home", Key.Home],
  ["ArrowLeft", Key.ArrowLeft],
  ["ArrowUp", Key.ArrowUp],
  ["ArrowRight", Key.ArrowRight],
  ["ArrowDown", Key.ArrowDown],
  ["Insert", Key.Insert],
  ["Delete", Key.Delete],
  ["Help", Key.Help],
  ["0", Key.Number0],
  ["1", Key.Number1],
  ["2", Key.Number2],
  ["3", Key.Number3],
  ["4", Key.Number4],
  ["5", Key.Number5],
  ["6", Key.Number6],
  ["7", Key.Number7],
  ["8", Key.Number8],
  ["9", Key.Number9],
  ["A", Key.LetterA],
  ["B", Key.LetterB],
  ["C", Key.LetterC],
  ["D", Key.LetterD],
  ["E", Key.LetterE],
  ["F", Key.LetterF],
  ["G", Key.LetterG],
  ["H", Key.LetterH],
  ["I", Key.LetterI],
  ["J", Key.LetterJ],
  ["K", Key.LetterK],
  ["L", Key.LetterL],
  ["M", Key.LetterM],
  ["N", Key.LetterN],
  ["O", Key.LetterO],
  ["P", Key.LetterP],
  ["Q", Key.LetterQ],
  ["R", Key.LetterR],
  ["S", Key.LetterS],
  ["T", Key.LetterT],
  ["U", Key.LetterU],
  ["V", Key.LetterV],
  ["W", Key.LetterW],
  ["X", Key.LetterX],
  ["Y", Key.LetterY],
  ["Z", Key.LetterZ],
  ["F1", Key.F1],
  ["F2", Key.F2],
  ["F3", Key.F3],
  ["F4", Key.F4],
  ["F5", Key.F5],
  ["F6", Key.F6],
  ["F7", Key.F7],
  ["F8", Key.F8],
  ["F9", Key.F9],
  ["F10", Key.F10],
  ["F11", Key.F11],
  ["F12", Key.F12],
  ["NumLock", Key.NumLock],
  ["ScrollLock", Key.ScrollLock],
  [";", Key.Semicolon],
  ["=", Key.Equal],
  [",", Key.Comma],
  ["-", Key.Minus],
  [".", Key.Period],
  ["/", Key.ForwardSlash],
  ["`", Key.Backquote],
  ["[", Key.BracketLeft],
  ["\\", Key.Backslash],
  ["]", Key.BracketRight],
  [`"`, Key.Quote],
]);

/**
 * Table for looking up the display values that correspond to a {@linkcode Chord}.
 *
 * @internal
 */
export const tokensDisplayTable = new Map<Chord, string>([
  [MouseButton.Auxiliary, "Middle Click"],
  [MouseButton.BrowserBack, "Back Click"],
  [MouseButton.BrowserForward, "Forward Click"],
  [MouseButton.Left, "Left Click"],
  [MouseButton.Right, "Right Click"],
  [Modifier.Alt, isPlatform("mac") ? "⌥" : "Alt"],
  [Modifier.Cmd, isPlatform("mac") ? "⌘" : "Meta"],
  [Modifier.Ctrl, isPlatform("mac") ? "⌃" : "Ctrl"],
  [Modifier.Shift, "Shift"],
  [Modifier.CmdOrCtrl, isPlatform("mac") ? "⌘" : "Ctrl"],
  [Key.ArrowDown, "▼"],
  [Key.ArrowLeft, "◀"],
  [Key.ArrowRight, "▶"],
  [Key.ArrowUp, "▲"],
  [Key.Backslash, "\\"],
  [Key.BracketLeft, "["],
  [Key.BracketRight, "]"],
  [Key.Comma, ","],
  [Key.Equal, "+"],
  [Key.Escape, "Esc"],
  [Key.Minus, "-"],
  [Key.ForwardSlash, "/"],
]);
