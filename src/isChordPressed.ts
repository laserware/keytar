import { isPlatform } from "@laserware/arcade";

import { getKeyForLookup, hasTokenInChord, stripToken } from "./common.js";
import { eventKeyByKeyEnumTable } from "./tables.js";
import {
  type Chord,
  type ChordedEvent,
  Modifier,
  MouseButton,
  MouseEventButton,
} from "./types.js";

/**
 * Checks if one of the specified `chords` combinations was pressed based on
 * the specified keyboard or mouse `event`.
 *
 * @param event Keyboard or mouse event from an event listener.
 * @param chords Combination of {@linkcode Token} elements to check for from the event.
 *
 * @returns `true` if any of the specified `chords` were pressed.
 */
export function isChordPressed(
  event: ChordedEvent,
  ...chords: Chord[]
): boolean {
  let matchCount = 0;

  for (const chord of chords) {
    let lookup = chord;

    if ("buttons" in event) {
      const button = event.buttons as MouseEventButton;

      if (button === MouseEventButton.BrowserForward) {
        lookup = stripToken(lookup, MouseButton.BrowserForward);
      }

      if (button === MouseEventButton.BrowserBack) {
        lookup = stripToken(lookup, MouseButton.BrowserBack);
      }

      if (button === MouseEventButton.Auxiliary) {
        lookup = stripToken(lookup, MouseButton.Auxiliary);
      }

      if (button === MouseEventButton.Right) {
        lookup = stripToken(lookup, MouseButton.Right);
      }

      if (button === MouseEventButton.Left) {
        lookup = stripToken(lookup, MouseButton.Left);
      }

      if (lookup === 0) {
        matchCount++;
        continue;
      }
    }

    // Note that the order of the chord checks for modifiers is important.
    // We start with the highest bit flag and work down to the lowest one.
    // If we didn't do this, we might get an invalid combination of chords.
    if (hasTokenInChord(chord, Modifier.Shift) && event.shiftKey) {
      lookup = lookup & ~Modifier.Shift;
    } else if (event.shiftKey) {
      continue;
    }

    /*
     * Since the `Modifier.CmdOrCtrl` flag is a bitwise OR of `Modifier.Cmd` and
     * `Modifier.Ctrl`, we want to clear the flag for the modifier that _isn't_
     * associated with that platform. So on macOS, we clear the `Modifier.Ctrl`
     * flag since we're checking if `Modifier.Cmd` was pressed. On Linux/Windows,
     * we clear `Modifier.Cmd` (or Windows key), since we're checking if
     * `Modifier.Ctrl` was pressed.
     */
    if (hasTokenInChord(chord, Modifier.CmdOrCtrl)) {
      if (isPlatform("mac")) {
        if (event.metaKey) {
          lookup = lookup & ~Modifier.Ctrl;
        } else {
          continue;
        }
      } else {
        if (event.ctrlKey) {
          lookup = lookup & ~Modifier.Cmd;
        } else {
          continue;
        }
      }
    }

    if (hasTokenInChord(chord, Modifier.Ctrl) && event.ctrlKey) {
      lookup = lookup & ~Modifier.Ctrl;
    } else if (event.ctrlKey) {
      continue;
    }

    if (hasTokenInChord(chord, Modifier.Cmd) && event.metaKey) {
      lookup = lookup & ~Modifier.Cmd;
    } else if (event.metaKey) {
      continue;
    }

    if (hasTokenInChord(chord, Modifier.Alt) && event.altKey) {
      lookup = lookup & ~Modifier.Alt;
    } else if (event.altKey) {
      continue;
    }

    if (lookup === 0) {
      matchCount++;
      continue;
    }

    if ("key" in event) {
      const key = getKeyForLookup(event);

      if (key === eventKeyByKeyEnumTable.get(lookup)) {
        matchCount++;
      }
    }
  }

  return matchCount > 0;
}
