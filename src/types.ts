type KeyModifierStateFields = Pick<
  ChordedEvent,
  "altKey" | "ctrlKey" | "shiftKey" | "metaKey"
>;

/**
 * Boolean flag field names from a KeyboardEvent instance used to indicate
 * which modifiers are down.
 */
export type KeyModifierState = keyof KeyModifierStateFields;

/**
 * An event from which a combination of {@link Token} elements can be extracted.
 */
export type ChordedEvent = KeyboardEvent | MouseEvent;

/**
 * A {@link Key}, {@link Modifier}, or {@link MouseButton}. This represents a
 * single element in a chord.
 */
export type Token = Key | Modifier | MouseButton;

/**
 * A {@link Token} or combination of Tokens.
 */
export type Chord = Token | number;

/**
 * Numbers that correspond to the key codes of the keyboard. Note that
 * these are not the same as the character codes and don't support
 * international keyboards.
 *
 * This {@link https://www.toptal.com/developers/keycode/table|table} was used
 * as a reference for the key values, but a good chunk of them weren't used.
 */
export enum Key {
  Backspace = 8,
  Tab = 9,
  Clear = 12,
  Enter = 13,
  Pause = 19,
  CapsLock = 20,
  Escape = 27,
  Space = 32,
  PageUp = 33,
  PageDown = 34,
  End = 35,
  Home = 36,
  ArrowLeft = 37,
  ArrowUp = 38,
  ArrowRight = 39,
  ArrowDown = 40,
  Insert = 45,
  Delete = 46,
  Help = 47,
  Number0 = 48,
  Number1 = 49,
  Number2 = 50,
  Number3 = 51,
  Number4 = 52,
  Number5 = 53,
  Number6 = 54,
  Number7 = 55,
  Number8 = 56,
  Number9 = 57,
  Period = 58,
  Semicolon = 59,
  Backquote = 60,
  Equal = 61,
  Minus = 63,
  LetterA = 65,
  LetterB = 66,
  LetterC = 67,
  LetterD = 68,
  LetterE = 69,
  LetterF = 70,
  LetterG = 71,
  LetterH = 72,
  LetterI = 73,
  LetterJ = 74,
  LetterK = 75,
  LetterL = 76,
  LetterM = 77,
  LetterN = 78,
  LetterO = 79,
  LetterP = 80,
  LetterQ = 81,
  LetterR = 82,
  LetterS = 83,
  LetterT = 84,
  LetterU = 85,
  LetterV = 86,
  LetterW = 87,
  LetterX = 88,
  LetterY = 89,
  LetterZ = 90,
  F1 = 112,
  F2 = 113,
  F3 = 114,
  F4 = 115,
  F5 = 116,
  F6 = 117,
  F7 = 118,
  F8 = 119,
  F9 = 120,
  F10 = 121,
  F11 = 122,
  F12 = 123,
  NumLock = 144,
  ScrollLock = 145,
  BracketLeft = 160,
  BracketRight = 161,
  Backslash = 164,
  Comma = 165,
  ForwardSlash = 166,
  Quote = 167,
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
 * Keyboard modifier keys (e.g. Shift, Alt, etc.).
 */
export enum Modifier {
  /* 256  */ Alt = 1 << 8,
  /* 512  */ Cmd = 1 << 9,
  /* 1024 */ Ctrl = 1 << 10,
  /* 2048 */ Shift = 1 << 11,
  /* 4096 */ CmdOrCtrl = 1 << 12,
}

/**
 * Represents mouse buttons that could be pressed. These do not match the mouse
 * buttons from the MouseEvent (which are much lower). This is so we can check
 * for a combination of keyboard modifiers and mouse buttons
 * (e.g. Shift + Left Click).
 */
export enum MouseButton {
  /* 4096   */ None = 0,
  // We start here so we can include keyboard modifiers:
  /* 8192   */ Left = 1 << 13,
  /* 16384  */ Right = 1 << 14,
  /* 32768  */ Auxiliary = 1 << 15,
  /* 65536  */ BrowserBack = 1 << 16,
  /* 131073 */ BrowserForward = 1 << 17,
}
