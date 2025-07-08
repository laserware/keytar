type KeyModifierStateFields = Pick<
  ChordedEvent,
  "altKey" | "ctrlKey" | "shiftKey" | "metaKey"
>;

/**
 * Boolean flag field names from a [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
 * instance used to indicate which modifiers are down.
 */
export type KeyModifierState = keyof KeyModifierStateFields;

/**
 * An event from which a combination of {@linkcode Token} elements can be extracted.
 */
export type ChordedEvent = KeyboardEvent | MouseEvent;

/**
 * A {@linkcode Key}, {@linkcode Modifier}, or {@linkcode MouseButton}. This represents a
 * single element in a chord.
 */
export type Token = Key | Modifier | MouseButton;

/**
 * A single {@linkcode Token} or a combination of Tokens which are joined via a
 * [bitwise OR (|) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR).
 *
 * @example
 * const single = Key.LetterC;
 *
 * const combination = Modifier.Alt | Key.Number2;
 */
export type Chord = Token | number;

/**
 * Numbers that correspond to the key codes of the keyboard. Note that
 * these are different from the character codes and don't support
 * international keyboards.
 */
export enum Key {
  Backspace = 1,
  Tab = 2,
  Clear = 3,
  Enter = 4,
  Pause = 5,
  CapsLock = 6,
  Escape = 7,
  Space = 8,
  PageUp = 9,
  PageDown = 10,
  End = 11,
  Home = 12,
  ArrowLeft = 13,
  ArrowUp = 14,
  ArrowRight = 15,
  ArrowDown = 16,
  Insert = 17,
  Delete = 18,
  Help = 19,
  Number0 = 20,
  Number1 = 21,
  Number2 = 22,
  Number3 = 23,
  Number4 = 24,
  Number5 = 25,
  Number6 = 26,
  Number7 = 27,
  Number8 = 28,
  Number9 = 29,
  Period = 30,
  Semicolon = 31,
  Backquote = 32,
  Equal = 33,
  Minus = 34,
  LetterA = 35,
  LetterB = 36,
  LetterC = 37,
  LetterD = 38,
  LetterE = 39,
  LetterF = 40,
  LetterG = 41,
  LetterH = 42,
  LetterI = 43,
  LetterJ = 44,
  LetterK = 45,
  LetterL = 46,
  LetterM = 47,
  LetterN = 48,
  LetterO = 49,
  LetterP = 50,
  LetterQ = 51,
  LetterR = 52,
  LetterS = 53,
  LetterT = 54,
  LetterU = 55,
  LetterV = 56,
  LetterW = 57,
  LetterX = 58,
  LetterY = 59,
  LetterZ = 60,
  F1 = 61,
  F2 = 62,
  F3 = 63,
  F4 = 64,
  F5 = 65,
  F6 = 66,
  F7 = 67,
  F8 = 68,
  F9 = 69,
  F10 = 70,
  F11 = 71,
  F12 = 72,
  NumLock = 73,
  ScrollLock = 74,
  BracketLeft = 75,
  BracketRight = 76,
  Backslash = 77,
  Comma = 78,
  ForwardSlash = 79,
  Quote = 80,
}

/**
 * Keyboard modifier keys (e.g. Shift, Alt, etc.).
 */
export enum Modifier {
  /* 256  */ Alt = 1 << 8,
  /* 512  */ Cmd = 1 << 9,
  /* 1024 */ Ctrl = 1 << 10,
  /* 1536 */ CmdOrCtrl = Cmd | Ctrl,
  /* 2048 */ Shift = 1 << 11,
}

/**
 * These are taken directly from the actual value from the event. We're using
 * the bit-shifted representation to stay consistent with {@linkcode Modifier}.
 *
 * See the [buttons](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons)
 * documentation on MDN for additional details.
 */
export enum MouseEventButton {
  /* 0  */ None = 0,
  /* 1  */ Left = 1 << 0,
  /* 2  */ Right = 1 << 1,
  /* 4  */ Auxiliary = 1 << 2,
  /* 8  */ BrowserBack = 1 << 3,
  /* 16 */ BrowserForward = 1 << 4,
}

/**
 * Represents mouse buttons that could be pressed. These do not match the mouse
 * buttons from the [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) (which are much lower).
 * This is so we can check for a combination of keyboard modifiers and mouse
 * buttons (e.g. `Shift` + Left Click).
 */
export enum MouseButton {
  None = 0,
  // We start here so we can include keyboard modifiers:
  /* 8192   */ Left = 1 << 13,
  /* 16384  */ Right = 1 << 14,
  /* 32768  */ Auxiliary = 1 << 15,
  /* 65536  */ BrowserBack = 1 << 16,
  /* 131073 */ BrowserForward = 1 << 17,
}
