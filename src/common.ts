import type { Chord } from "./types.ts";

export function stripChord(combo: number, chord: number): number {
  if (hasChordInCombo(combo, chord)) {
    return combo & ~chord;
  } else {
    return combo;
  }
}

/**
 * Returns true if the specified combo includes the specified chord.
 *
 * @param combo Combination of modifiers or keys to check against.
 * @param chord Chord to check for.
 */
export function hasChordInCombo(combo: number, chord: Chord): boolean {
  return (combo & chord) === chord;
}
