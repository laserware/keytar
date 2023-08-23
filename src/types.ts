/**
 * These are taken directly from the actual value from the event. We're using
 * the bit-shifted representation to stay consistent with {@link Modifier}.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
 */
export enum MouseButton {
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

export type ComboHandler = () => boolean | void;

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
