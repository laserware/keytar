import { cachePlatform, Platform } from "@laserware/arcade";

import { stripChord } from "./common.ts";
import {
  eventKeyByKeyEnumTable,
  keyEnumByEventKeyTable,
  modifierByModifierStatusTable,
  mouseButtonByEventButtonTable,
} from "./tables.ts";
import {
  EventButton,
  Key,
  Modifier,
  MouseButton,
  type Chord,
  type ChordedEvent,
} from "./types.ts";

const platform = cachePlatform();

const chordDisplayTable = new Map<Chord, string>([
  [MouseButton.Auxiliary, "Middle Click"],
  [MouseButton.BrowserBack, "Back Click"],
  [MouseButton.BrowserForward, "Forward Click"],
  [MouseButton.Left, "Left Click"],
  [MouseButton.Right, "Right Click"],
  [Modifier.Alt, platform === Platform.Mac ? "⌥" : "Alt"],
  [Modifier.Cmd, platform === Platform.Mac ? "⌘" : "Meta"],
  [Modifier.Ctrl, platform === Platform.Mac ? "⌃" : "Ctrl"],
  [Modifier.Shift, "Shift"],
  [Modifier.CmdOrCtrl, platform === Platform.Mac ? "⌘" : "Ctrl"],
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
  let chordSet: ChordSet;

  if (typeof chordOrEvent === "number") {
    chordSet = new Set<Chord>();

    let combo = chordOrEvent;

    const nonKeyChords = [
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

    for (const nonKeyChord of nonKeyChords) {
      const strippedCombo = stripChord(combo, nonKeyChord);

      if (strippedCombo !== combo) {
        chordSet.add(nonKeyChord);
      }

      combo = strippedCombo;
    }

    if (combo !== 0) {
      chordSet.add(combo);
    }
  } else {
    chordSet = eventToChordSet(chordOrEvent);
  }

  const chordDisplays: string[] = [];

  for (const chord of chordSet) {
    const chordDisplay = chordDisplayTable.get(chord);

    if (chordDisplay !== undefined) {
      chordDisplays.push(chordDisplay);
      continue;
    }

    const eventKey = eventKeyByKeyEnumTable.get(chord);
    if (eventKey !== undefined) {
      chordDisplays.push(eventKey);
      continue;
    }

    if (typeof chordOrEvent !== "number" && "key" in chordOrEvent) {
      chordDisplays.push(chordOrEvent.key);
    }
  }

  if (chordDisplays.length === 0) {
    return "";
  }

  if (chordDisplays.length === 1) {
    return chordDisplays[0];
  }

  return chordDisplays.join(joinSymbol);
}

type ChordSet = Set<Chord>;

/**
 * Returns a Set with the chords extracted from the specified keyboard or mouse
 * event.
 *
 * @param event Keyboard or mouse event to extract chords from.
 */
export function eventToChordSet(event: ChordedEvent): ChordSet {
  const chords = new Set<Chord>();

  if ("buttons" in event) {
    const eventButton = event.buttons as EventButton;

    const mouseButton = mouseButtonByEventButtonTable.get(eventButton);
    if (mouseButton !== undefined) {
      chords.add(mouseButton);
    }
  }

  modifierByModifierStatusTable.forEach((modifier, state) => {
    if (event[state]) {
      chords.add(modifier);
    }
  });

  if ("key" in event) {
    const keyEnum = keyEnumByEventKeyTable.get(event.key.toUpperCase());

    if (keyEnum !== undefined) {
      chords.add(keyEnum);
    }
  }

  return chords;
}
