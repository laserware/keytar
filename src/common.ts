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
 * Returns a valid key that can be used to lookup the corresponding enum value
 * in the lookup table.
 *
 * @param event KeyboardEvent to extrapolate key from.
 */
export function getKeyForLookup(event: KeyboardEvent): string {
  // Only convert single letters to upper case:
  if (event.key.length === 1 && /[a-z]/i.test(event.key)) {
    return event.key.toUpperCase();
  } else if (event.code.startsWith("Key")) {
    // On macOS, if the user presses the Option key + a letter, the `event.key`
    // field could be `Unidentified`. We want to be able to use Option + letter
    // as a keyboard shortcut, so we grab the letter key from the `code` instead:
    return event.code.at(-1) ?? "";
  } else {
    return event.key;
  }
}
