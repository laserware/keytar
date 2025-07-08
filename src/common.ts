import type { Chord, Token } from "./types.js";

/**
 * Strips the specified `token` from the specified `chord`.
 *
 * @internal
 *
 * @param chord Combination of {@linkcode Token} elements to strip token from.
 * @param token Token to remove from chord.
 *
 * @returns The chord with the specified `token` removed.
 */
export function stripToken(chord: Chord, token: Token): number {
  if (hasTokenInChord(chord, token)) {
    return chord & ~token;
  } else {
    return chord;
  }
}

/**
 * Checks if the specified `chord` includes the specified `token`.
 *
 * @internal
 *
 * @param chord Combination of tokens to check against.
 * @param token Token to check for in chord.
 *
 * @returns `true` if the specified `token` is present in the `chord`.
 */
export function hasTokenInChord(chord: Chord, token: Token): boolean {
  return (chord & token) === token;
}

/**
 * Tries to find a valid key that can be used to look up the corresponding enum
 * value in the lookup table.
 *
 * @internal
 *
 * @param event KeyboardEvent to extrapolate key from.
 *
 * @returns `key` property from the specified KeyboardEvent.
 */
export function getKeyForLookup(event: KeyboardEvent): string {
  // Only convert single letters to upper case:
  if (event.key.length === 1 && /[a-z]/i.test(event.key)) {
    return event.key.toUpperCase();
  } else if (event.code.startsWith("Key")) {
    // On macOS, if the user presses the Option key and a letter, the `event.key`
    // field could be `Unidentified`. We want to be able to use Option + <letter>
    // as a keyboard shortcut, so we grab the letter key from the `code` instead:
    return event.code.at(-1) ?? "";
  } else {
    return event.key;
  }
}
