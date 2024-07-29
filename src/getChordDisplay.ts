import { cachePlatform, Platform } from "@laserware/arcade";

import { eventToChordSet } from "./eventToChords.ts";
import {
  Key,
  Modifier,
  MouseButton,
  type Chord,
  type ChordedEvent,
  type ChordSet,
} from "./types.ts";

const platform = cachePlatform();

const allReferenceChords: Chord[] = [
  ...Object.values(MouseButton),
  ...Object.values(Modifier),
  ...Object.values(Key),
] as Chord[];

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

    for (const referenceChord of allReferenceChords) {
      if ((chordOrEvent & referenceChord) === referenceChord) {
        chordSet.add(referenceChord);
      }
    }
  } else {
    chordSet = eventToChordSet(chordOrEvent);
  }

  const chordDisplays: string[] = [];

  for (const chord of chordSet) {
    const mouseButtonDisplay = displayForMouseButton(chord);

    if (mouseButtonDisplay !== null) {
      chordDisplays.push(mouseButtonDisplay);
      continue;
    }

    const modDisplay = displayForMod(chord);
    if (modDisplay !== null) {
      chordDisplays.push(modDisplay);
      continue;
    }

    const keyDisplay = displayForKey(chord);
    if (keyDisplay !== null) {
      chordDisplays.push(keyDisplay);
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

/**
 * Returns the value to display for the specified mouse button.
 */
function displayForMouseButton(mouseButtonChord: Chord): string | null {
  switch (mouseButtonChord) {
    case MouseButton.Auxiliary:
      return "Middle Click";

    case MouseButton.BrowserBack:
      return "Back Click";

    case MouseButton.BrowserForward:
      return "Forward Click";

    case MouseButton.Left:
      return "Left Click";

    case MouseButton.Right:
      return "Right Click";

    default:
      return null;
  }
}

/**
 * Returns the platform-dependent display value for the specified modifier.
 */
function displayForMod(modChord: Chord): string | null {
  switch (modChord) {
    case Modifier.Cmd:
      return platform === Platform.Mac ? "⌘" : "Meta";

    case Modifier.Ctrl:
      return platform === Platform.Mac ? "⌃" : "Ctrl";

    case Modifier.CmdOrCtrl:
      return platform === Platform.Mac ? "⌘" : "Ctrl";

    case Modifier.Alt:
      return platform === Platform.Mac ? "⌥" : "Alt";

    case Modifier.Shift:
      return "Shift";

    default:
      return null;
  }
}

/**
 * Returns the value to display for the specified key enum or Event.key value.
 */
function displayForKey(keyChord: Chord): string | null {
  switch (keyChord) {
    case Key.ArrowDown:
      return "▼";

    case Key.ArrowLeft:
      return "◀";

    case Key.ArrowRight:
      return "▶";

    case Key.ArrowUp:
      return "▲";

    case Key.Backslash:
      return "\\";

    case Key.BracketLeft:
      return "[";

    case Key.BracketRight:
      return "]";

    case Key.Comma:
      return ",";

    case Key.Equal:
      return "+";

    case Key.Escape:
      return "Esc";

    case Key.Minus:
      return "-";

    case Key.ForwardSlash:
      return "/";

    default:
      return null;
  }
}
