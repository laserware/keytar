import { areKeysDown } from "./areKeysDown.js";
import type { ComboHandler } from "./types.js";

/**
 * Fires the handler that maps to the specified key combination for the
 * specified keyboard event.
 * @param event Keyboard event to fire handler for
 * @param handlers Handlers that map to key combinations
 * @example
 * function handleKeyDown(event: KeyboardEvent): void {
 *   handleKeyCombos(event, {
 *     [Key.LetterB]() {
 *       // This function gets called if the user _only_ presses the letter B.
 *     },
 *   });
 * }
 */
export function handleKeyCombos(
  event: KeyboardEvent,
  handlers: Record<number, ComboHandler>,
): boolean | void {
  for (const [combo, func] of Object.entries(handlers)) {
    if (areKeysDown(event, Number(combo))) {
      return func();
    }
  }
}
