import { cachePlatform, Platform } from "@laserware/arcade";

import { eventKeyByKeyEnumTable } from "./tables.ts";
import {
  EventButton,
  Key,
  Modifier,
  type Chord,
  type ChordedEvent,
} from "./types.js";

const platform = cachePlatform();

/**
 * Returns true if one of the specified keyboard or mouse chords are pressed
 * based on the specified keyboard or mouse event.
 *
 * @param event Keyboard or mouse event from an event listener.
 * @param chords Combination of modifier keys, keys, and mouse buttons to check for from the event.
 */
export function isChordPressed(
  event: ChordedEvent,
  ...chords: Chord[]
): boolean {
  const chordsLength = chords.length;

  // In _most_ cases, you'll probably only use this for a single chord, so
  // we want to handle this case without getting into a for loop:
  if (chordsLength === 1) {
    return chordFoundInEvent(event, chords[0]);
  }

  // Using an OG loop here because it's _slightly_ more performant than
  // a `for...of` and `forEach` loop:
  for (let index = 0; index < chordsLength; index++) {
    if (chordFoundInEvent(event, chords[index])) {
      return true;
    }
  }

  return false;
}

/**
 * Returns true if the specified single combination is pressed based on the
 * specified keyboard or mouse event.
 *
 * @param event Keyboard or mouse event from an event listener.
 * @param chord Combination of keys and mouse buttons to check for from the event.
 */
function chordFoundInEvent(event: ChordedEvent, chord: Chord): boolean {
  let lookupKey = chord;

  if ("buttons" in event) {
    lookupKey = stripMouseButtons(event, lookupKey);

    if (lookupKey === 0) {
      return true;
    }
  }

  /*
   * Since the `Modifier.CmdOrCtrl` flag is a bitwise OR of `Modifier.Cmd` and
   * `Modifier.Ctrl`, we want to clear the flag for the modifier that _isn't_
   * associated with that platform. So on macOS, we clear the `Modifier.Ctrl`
   * flag since we're checking if `Modifier.Cmd` was pressed. On Linux/Windows,
   * we clear `Modifier.Cmd` (or Windows key), since we're checking if
   * `Modifier.Ctrl` was pressed.
   */
  if ((chord & Modifier.CmdOrCtrl) === Modifier.CmdOrCtrl) {
    if (platform === Platform.Mac) {
      if (event.metaKey) {
        lookupKey = lookupKey & ~Modifier.Ctrl;
      } else {
        return false;
      }
    } else {
      if (event.ctrlKey) {
        lookupKey = lookupKey & ~Modifier.Cmd;
      } else {
        return false;
      }
    }
  }

  if ((chord & Modifier.Cmd) === Modifier.Cmd && event.metaKey) {
    lookupKey = lookupKey & ~Modifier.Cmd;
  } else if (event.metaKey) {
    return false;
  }

  if ((chord & Modifier.Ctrl) === Modifier.Ctrl && event.ctrlKey) {
    lookupKey = lookupKey & ~Modifier.Ctrl;
  } else if (event.ctrlKey) {
    return false;
  }

  if ((chord & Modifier.Alt) === Modifier.Alt && event.altKey) {
    lookupKey = lookupKey & ~Modifier.Alt;
  } else if (event.altKey) {
    return false;
  }

  if ((chord & Modifier.Shift) === Modifier.Shift && event.shiftKey) {
    lookupKey = lookupKey & ~Modifier.Shift;
  } else if (event.shiftKey) {
    return false;
  }

  if (lookupKey === 0) {
    return true;
  }

  // @ts-expect-error: If this was a MouseEvent, the `keyCode === 0` check would have caught it.
  return event.key.toUpperCase() === eventKeyByKeyEnumTable[lookupKey as Key];
}

/**
 * Removes any mouse buttons from the chord assuming the event is a MouseEvent.
 * Returns the chord with the mouse buttons removed.
 *
 * @param event Mouse event from an event listener.
 * @param chord Starting chord to remove mouse buttons from.
 */
function stripMouseButtons(event: MouseEvent, chord: Chord): number {
  let strippedChord = chord;

  const button = event.buttons as EventButton;

  strippedChord = stripChord(strippedChord, button, EventButton.Left);
  strippedChord = stripChord(strippedChord, button, EventButton.Right);
  strippedChord = stripChord(strippedChord, button, EventButton.Auxiliary);
  strippedChord = stripChord(strippedChord, button, EventButton.BrowserBack);
  strippedChord = stripChord(strippedChord, button, EventButton.BrowserForward);

  return strippedChord;
}

function stripChord(
  currentValue: number,
  eventValue: number,
  chordToStrip: number,
): number {
  if (eventValue === chordToStrip) {
    if ((currentValue & chordToStrip) === chordToStrip) {
      return currentValue & ~chordToStrip;
    }
  }

  return currentValue;
}
