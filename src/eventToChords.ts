import { keyEnumByEventKeyTable } from "./tables.ts";
import {
  Modifier,
  MouseButton,
  EventButton,
  type Chord,
  type ChordedEvent,
  type ChordSet,
} from "./types.ts";

/**
 * Returns the modifier combination extrapolated from the specified keyboard or
 * mouse event.
 *
 * @param event Keyboard or mouse event from an event listener.
 */
export function eventToChord(event: ChordedEvent): Chord {
  const chords = eventToChordSet(event);

  let combined = 0;

  for (const chord of chords) {
    combined = combined | chord;
  }

  return combined;
}

/**
 * Returns a Set with the chords extracted from the specified keyboard or mouse
 * event.
 *
 * @param event Keyboard or mouse event to extract chords from.
 */
export function eventToChordSet(event: ChordedEvent): ChordSet {
  const chords = new Set<Chord>();

  if ("buttons" in event) {
    addChordsForMouse(event, chords);
  }

  addChordsForKeys(event, chords);

  return chords;
}

/**
 * Adds the key/modifier chords from the keyboard or mouse event to the
 * specified chords set.
 */
function addChordsForKeys(event: ChordedEvent, chords: ChordSet): void {
  if (event.metaKey) {
    chords.add(Modifier.Cmd);
  }

  if (event.ctrlKey) {
    chords.add(Modifier.Ctrl);
  }

  if (event.shiftKey) {
    chords.add(Modifier.Shift);
  }

  if (event.altKey) {
    chords.add(Modifier.Alt);
  }

  if ("key" in event) {
    const keyEnum = keyEnumByEventKeyTable[event.key.toUpperCase()];

    // @ts-ignore I know this is a number and the types match.
    if (keyEnum !== 0) {
      chords.add(keyEnum);
    }
  }
}

/**
 * Adds the mouse buttons chords from the specified mouse event to the specified
 * chords set.
 */
function addChordsForMouse(event: MouseEvent, chords: ChordSet): void {
  const mouseButton = event.buttons as EventButton;

  if (mouseButton === EventButton.Left) {
    chords.add(MouseButton.Left);
  }

  if (mouseButton === EventButton.Right) {
    chords.add(MouseButton.Right);
  }

  if (mouseButton === EventButton.Auxiliary) {
    chords.add(MouseButton.Auxiliary);
  }

  if (mouseButton === EventButton.BrowserBack) {
    chords.add(MouseButton.BrowserBack);
  }

  if (mouseButton === EventButton.BrowserForward) {
    chords.add(MouseButton.BrowserForward);
  }
}
