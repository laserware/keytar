import type { Token } from "./types.ts";

/**
 * Strips the {@link Token} from the specified {@link Chord} and returns the result.
 *
 * @param chord Combination of {@link Token} elements to strip token from.
 * @param token Token to remove from chord.
 */
export function stripToken(chord: number, token: number): number {
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
export function hasTokenInChord(chord: number, token: Token): boolean {
  return (chord & token) === token;
}
