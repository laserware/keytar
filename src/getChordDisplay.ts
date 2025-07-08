import { getKeyForLookup, stripToken } from "./common.js";
import {
  eventKeyByKeyEnumTable,
  keyEnumByEventKeyTable,
  modifierByModifierStatusTable,
  mouseButtonByMouseEventButtonTable,
  tokensDisplayTable,
} from "./tables.js";
import {
  type Chord,
  type ChordedEvent,
  type Key,
  Modifier,
  MouseButton,
  type MouseEventButton,
  type Token,
} from "./types.js";

type TokenSet = Set<Token>;

/**
 * Gets the display value for the specified `chord`. If the chord is a combination
 * of multiple keys/buttons, the display value for each key/button is joined with
 * the specified `joinSymbol`.
 *
 * @param chord Combination of {@linkcode Token} elements to get display value for.
 * @param [joinSymbol=" + "] Symbol to join chord display values.
 *
 * @returns The display value extracted from the specified `chord`.
 */
export function getChordDisplay(chord: Chord, joinSymbol?: string): string;

/**
 * Gets the display value for the {@linkcode Chord} derived from the specified
 * keyboard or mouse `event`. If the chord is a combination of multiple
 * keys/buttons, the display value for each key/button is joined with the
 * specified `joinSymbol`.
 *
 * @param event Keyboard or mouse event to get chord display for.
 * @param [joinSymbol=" + "] Symbol to join chord display values.
 *
 * @returns The display value for the chords extracted from the specified `event`.
 */
export function getChordDisplay(
  event: ChordedEvent,
  joinSymbol?: string,
): string;

export function getChordDisplay(
  chordOrEvent: Chord | ChordedEvent,
  joinSymbol = " + ",
): string {
  const tokens =
    typeof chordOrEvent === "number"
      ? chordToTokens(chordOrEvent)
      : eventToTokens(chordOrEvent);

  const displayValues: string[] = [];

  for (const token of tokens) {
    const tokenDisplay = tokensDisplayTable.get(token);

    if (tokenDisplay !== undefined) {
      displayValues.push(tokenDisplay);
      continue;
    }

    const eventKey = eventKeyByKeyEnumTable.get(token as Key);
    if (eventKey !== undefined) {
      displayValues.push(eventKey);
      continue;
    }

    if (typeof chordOrEvent !== "number" && "key" in chordOrEvent) {
      displayValues.push(chordOrEvent.key);
    }
  }

  if (displayValues.length === 0) {
    return "";
  }

  if (displayValues.length === 1) {
    return displayValues[0];
  }

  return displayValues.join(joinSymbol);
}

/**
 * Creates a Set with the {@linkcode Token} elements extracted from the specified `chord`.
 *
 * @internal
 *
 * @param chord Combination of {@linkcode Token} elements to extra into individual tokens.
 *
 * @returns A Set of unique tokens extracted from the specified `chord`.
 */
function chordToTokens(chord: Chord): TokenSet {
  const tokens = new Set<Token>();

  let currentChord = chord;

  const nonKeyTokens = [
    Modifier.Alt,
    Modifier.Cmd,
    Modifier.Ctrl,
    Modifier.CmdOrCtrl,
    Modifier.Shift,
    MouseButton.Left,
    MouseButton.Right,
    MouseButton.Auxiliary,
    MouseButton.BrowserBack,
    MouseButton.BrowserForward,
  ];

  for (const nonKeyToken of nonKeyTokens) {
    const strippedChord = stripToken(currentChord, nonKeyToken);

    if (strippedChord !== currentChord) {
      tokens.add(nonKeyToken);
    }

    currentChord = strippedChord;
  }

  if (currentChord !== 0) {
    tokens.add(currentChord);
  }

  return tokens;
}

/**
 * Creates a Set with the tokens extracted from the specified keyboard or mouse
 * `event`.
 *
 * @internal
 *
 * @param event Keyboard or mouse event to extract tokens from.
 *
 * @returns A Set of unique tokens extracted from the specified `chord`.
 */
function eventToTokens(event: ChordedEvent): TokenSet {
  const tokens = new Set<Token>();

  for (const [state, modifier] of modifierByModifierStatusTable) {
    if (event[state]) {
      tokens.add(modifier);
    }
  }

  if ("buttons" in event) {
    const eventButton = event.buttons as MouseEventButton;

    const mouseButton = mouseButtonByMouseEventButtonTable.get(eventButton);
    if (mouseButton !== undefined) {
      tokens.add(mouseButton);
    }
  }

  if ("key" in event) {
    const key = getKeyForLookup(event);

    const keyEnum = keyEnumByEventKeyTable.get(key);

    if (keyEnum !== undefined) {
      tokens.add(keyEnum);
    }
  }

  return tokens;
}
