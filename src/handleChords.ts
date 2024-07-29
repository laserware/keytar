import { isChordPressed } from "./isChordPressed.ts";
import type { ChordedEvent, ChordMatchHandler } from "./types.ts";

/**
 * Fires the handler that maps to the specified key or mouse button combination
 * for the specified keyboard or mouse event.
 *
 * @param event Keyboard or mouse event from an event listener.
 * @param handlers Handlers that map to key combinations and mouse buttons.
 *
 * @example
 * function handleKeyDown(event: KeyboardEvent): void {
 *   handleChords(event, {
 *     [Key.LetterB]() {
 *       // This function gets called if the user _only_ presses the letter B.
 *     },
 *   });
 * }
 */
export function handleChords(
  event: ChordedEvent,
  handlers: Record<number, ChordMatchHandler>,
): boolean {
  for (const [chord, func] of Object.entries(handlers)) {
    if (isChordPressed(event, Number(chord))) {
      return func() ?? false;
    }
  }

  return false;
}
