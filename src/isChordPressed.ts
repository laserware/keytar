import { cachePlatform, Platform } from "@laserware/arcade";

import { hasTokenInChord, stripToken } from "./common.ts";
import { eventKeyByKeyEnumTable } from "./tables.ts";
import {
  EventButton,
  Modifier,
  MouseButton,
  type Chord,
  type ChordedEvent,
} from "./types.ts";

const platform = cachePlatform();

/**
 * Returns true if one of the specified {@link Chord} combinations are pressed
 * based on the specified keyboard or mouse event.
 *
 * @param event Keyboard or mouse event from an event listener.
 * @param chords Combination of {@link Token} elements to check for from the event.
 */
export function isChordPressed(
  event: ChordedEvent,
  ...chords: Chord[]
): boolean {
  for (const chord of chords) {
    let lookup = chord;

    if ("buttons" in event) {
      const button = event.buttons as EventButton;

      if (button === EventButton.Left) {
        lookup = stripToken(lookup, MouseButton.Left);
      }

      if (button === EventButton.Right) {
        lookup = stripToken(lookup, MouseButton.Right);
      }

      if (button === EventButton.Auxiliary) {
        lookup = stripToken(lookup, MouseButton.Auxiliary);
      }

      if (button === EventButton.BrowserBack) {
        lookup = stripToken(lookup, MouseButton.BrowserBack);
      }

      if (button === EventButton.BrowserForward) {
        lookup = stripToken(lookup, MouseButton.BrowserForward);
      }

      if (lookup === 0) {
        return true;
      }
    }

    if (hasTokenInChord(chord, Modifier.CmdOrCtrl)) {
      if (platform === Platform.Mac) {
        if (event.metaKey) {
          lookup = lookup & ~Modifier.CmdOrCtrl;
        } else {
          return false;
        }
      } else {
        if (event.ctrlKey) {
          lookup = lookup & ~Modifier.CmdOrCtrl;
        } else {
          return false;
        }
      }
    }

    if (hasTokenInChord(chord, Modifier.Alt) && event.altKey) {
      lookup = lookup & ~Modifier.Alt;
    } else if (event.altKey) {
      return false;
    }

    if (hasTokenInChord(chord, Modifier.Ctrl) && event.ctrlKey) {
      lookup = lookup & ~Modifier.Ctrl;
    } else if (event.ctrlKey) {
      return false;
    }

    if (hasTokenInChord(chord, Modifier.Cmd) && event.metaKey) {
      lookup = lookup & ~Modifier.Cmd;
    } else if (event.metaKey) {
      return false;
    }

    if (hasTokenInChord(chord, Modifier.Shift) && event.shiftKey) {
      lookup = lookup & ~Modifier.Shift;
    } else if (event.shiftKey) {
      return false;
    }

    if (lookup === 0) {
      return true;
    }

    // @ts-expect-error: If this was a MouseEvent, the `keyCode === 0` check would have caught it.
    if (event.key.toUpperCase() === eventKeyByKeyEnumTable.get(lookup)) {
      return true;
    }
  }

  return false;
}
