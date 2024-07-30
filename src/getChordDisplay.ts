import { stripToken } from "./common.ts";
import {
  eventKeyByKeyEnumTable,
  keyEnumByEventKeyTable,
  modifierByModifierStatusTable,
  mouseButtonByEventButtonTable,
  tokensDisplayTable,
} from "./tables.ts";
import {
  EventButton,
  Key,
  Modifier,
  MouseButton,
  type Chord,
  type ChordedEvent,
  type Token,
} from "./types.ts";

type TokenSet = Set<Token>;

/**
 * Returns the display value for the specified chord. If the chord is a combination
 * of multiple keys/buttons, the display value for each key/button is joined with
 * the specified join symbol.
 *
 * @param chord Chord containing keys/buttons to get display value for.
 * @param [joinSymbol=" + "] Symbol to join chord display values.
 */
export function getChordDisplay(chord: Chord, joinSymbol?: string): string;
/**
 * Returns the display value for the chord derived from the specified keyboard or
 * mouse event. If the chord is a combination of multiple keys/buttons, the
 * display value for each key/button is joined with the specified join symbol.
 *
 * @param event Keyboard or mouse event to get chord display for.
 * @param [joinSymbol=" + "] Symbol to join chord display values.
 */
export function getChordDisplay(
  event: ChordedEvent,
  joinSymbol?: string,
): string;
export function getChordDisplay(
  chordOrEvent: Chord | ChordedEvent,
  joinSymbol: string = " + ",
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
 * Returns a Set with the tokens extracted from the specified chord.
 *
 * @param chord Combo of chord values to extra into individual chords.
 */
function chordToTokens(chord: number): TokenSet {
  const tokens = new Set<Token>();

  let combo = chord;

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
    const strippedCombo = stripToken(combo, nonKeyToken);

    if (strippedCombo !== combo) {
      tokens.add(nonKeyToken);
    }

    combo = strippedCombo;
  }

  if (combo !== 0) {
    tokens.add(combo);
  }

  return tokens;
}

/**
 * Returns a Set with the tokens extracted from the specified keyboard or mouse
 * event.
 *
 * @param event Keyboard or mouse event to extract tokens from.
 */
function eventToTokens(event: ChordedEvent): TokenSet {
  const tokens = new Set<Token>();

  modifierByModifierStatusTable.forEach((modifier, state) => {
    if (event[state]) {
      tokens.add(modifier);
    }
  });

  if ("buttons" in event) {
    const eventButton = event.buttons as EventButton;

    const mouseButton = mouseButtonByEventButtonTable.get(eventButton);
    if (mouseButton !== undefined) {
      tokens.add(mouseButton);
    }
  }

  if ("key" in event) {
    let key = event.key;

    // Only convert single letters to upper case. Numbers are also included
    // here, but converting them to upper case does nothing:
    if (key.length === 1) {
      key = key.toUpperCase();
    }

    const keyEnum = keyEnumByEventKeyTable.get(key);

    if (keyEnum !== undefined) {
      tokens.add(keyEnum);
    }
  }

  return tokens;
}
