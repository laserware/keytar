import { isKeyComboDown } from "./isKeyComboDown.ts";
import type { ComboHandler } from "./types.ts";

/**
 * Fires the handler that maps to the specified key combination for the
 * specified keyboard or mouse event.
 *
 * @param event Keyboard or mouse event from an event listener.
 * @param handlers Handlers that map to key combinations.
 *
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
  event: KeyboardEvent | MouseEvent,
  handlers: Record<number, ComboHandler>,
): boolean {
  for (const [combo, func] of Object.entries(handlers)) {
    if (isKeyComboDown(event, Number(combo))) {
      return func() ?? false;
    }
  }

  return false;
}
