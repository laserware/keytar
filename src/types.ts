export type ChordedEvent = KeyboardEvent | MouseEvent;

export type Chord = Key | Modifier | MouseButton | number;

export type ChordSet = Set<Chord>;

/**
 * Represents mouse buttons that could be pressed. These do not match the mouse
 * buttons from the MouseEvent (which are much lower). This is so we can check
 * for a combination of keyboard modifiers and mouse buttons
 * (e.g. Shift + Left Click).
 */
export enum MouseButton {
  /* 65536   */ None = 0,
  /* 131072  */ Left = 1 << 16,
  /* 262144  */ Right = 1 << 17,
  /* 524288  */ Auxiliary = 1 << 18,
  /* 1048577 */ BrowserBack = 1 << 19,
  /* 2097152 */ BrowserForward = 1 << 20,
}

/**
 * These are taken directly from the actual value from the event. We're using
 * the bit-shifted representation to stay consistent with {@link Modifier}.
 *
 * See the {@link https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons|buttons} documentation
 * on MDN for additional details.
 */
export enum EventButton {
  /* 0  */ None = 0,
  /* 1  */ Left = 1 << 0,
  /* 2  */ Right = 1 << 1,
  /* 4  */ Auxiliary = 1 << 2,
  /* 8  */ BrowserBack = 1 << 3,
  /* 16 */ BrowserForward = 1 << 4,
}

/**
 * Represents modifier keys.
 */
export enum Modifier {
  /* 4096  */ Ctrl = 1 << 12,
  /* 8192  */ Cmd = 1 << 13,
  /* 12288 */ CmdOrCtrl = Cmd | Ctrl,
  /* 16384 */ Alt = 1 << 14,
  /* 32768 */ Shift = 1 << 15,
}

export type ChordMatchHandler = () => boolean | void;

/**
 * Numbers that correspond to the key codes of the keyboard. Note that
 * these are not the same as the character codes and don't support
 * international keyboards.
 */
export enum Key {
  Backspace = 1,
  Tab,
  Clear,
  Enter,
  Escape,
  Space,
  PageUp,
  PageDown,
  End,
  Home,
  ArrowLeft,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Insert,
  Delete,
  Number0,
  Number1,
  Number2,
  Number3,
  Number4,
  Number5,
  Number6,
  Number7,
  Number8,
  Number9,
  LetterA,
  LetterB,
  LetterC,
  LetterD,
  LetterE,
  LetterF,
  LetterG,
  LetterH,
  LetterI,
  LetterJ,
  LetterK,
  LetterL,
  LetterM,
  LetterN,
  LetterO,
  LetterP,
  LetterQ,
  LetterR,
  LetterS,
  LetterT,
  LetterU,
  LetterV,
  LetterW,
  LetterX,
  LetterY,
  LetterZ,
  F1,
  F2,
  F3,
  F4,
  F5,
  F6,
  F7,
  F8,
  F9,
  F10,
  F11,
  F12,
  Semicolon,
  Equal,
  Comma,
  Minus,
  Period,
  ForwardSlash,
  Backquote,
  BracketLeft,
  Backslash,
  BracketRight,
  Quote,
}
