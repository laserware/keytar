import type { Chord, Token } from "./types.ts";

/**
 * Strips the {@link Token} from the specified {@link Chord} and returns the result.
 *
 * @param chord Combination of {@link Token} elements to strip token from.
 * @param token Token to remove from chord.
 */
export function stripToken(chord: Chord, token: Token): number {
  if (hasTokenInChord(chord, token)) {
    return chord & ~token;
  } else {
    return chord;
  }
}

/**
 * Returns true if the specified {@link Chord} includes the specified {@link Token}.
 *
 * @param chord Combination of {@link Token} elements to check against.
 * @param token Token to check for in chord.
 */
export function hasTokenInChord(chord: Chord, token: Token): boolean {
  return (chord & token) === token;
}

/**
 * Returns the specified key as a valid value for the lookup table.
 *
 * @param key Key to convert to lookup key.
 */
export function getKeyForLookup(key: string): string {
  // Only convert single letters to upper case:
  if (key.length === 1 && /[a-z]/i.test(key)) {
    return key.toUpperCase();
  } else {
    return key;
  }
}
