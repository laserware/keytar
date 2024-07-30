import { isChordPressed } from "./isChordPressed.ts";
import type { ChordedEvent } from "./types.ts";

type ChordMatchCallback<E extends ChordedEvent> = (event: E) => void;

type ChordInput = number | number[];

type OnChordMatch<E extends ChordedEvent> = (
  chords: ChordInput,
  callback: ChordMatchCallback<E>,
) => ChordHandler<E>;

interface ChordHandler<E extends ChordedEvent> {
  on: OnChordMatch<E>;
}

/**
 * Fires the handlers that map to the specified key or mouse chords for the
 * specified keyboard or mouse event.
 *
 * @param event Keyboard or mouse event from an event listener.
 * @param builder Builder that adds handlers that map to key combinations and mouse
 *                buttons.
 *
 * @example
 *  function handleKeyDown(event: KeyboardEvent): void {
 *    handleChords(event, (handler) => {
 *      handler
 *        .on(Modifier.Alt | Key.LetterC, () => {
 *          // Fired only when Alt + C is pressed.
 *        })
 *        .on(Key.LetterC, () => {
 *          // Fired only when C is pressed (without modifiers).
 *        })
 *        .on([Modifier.Alt | Key.LetterC, Key.LetterC], (event) => {
 *          // Fired when Alt + C _or_ C is pressed.
 *          event.preventDefault();
 *        });
 *     });
 *  }
 */
export function handleChords<E extends ChordedEvent>(
  event: E,
  builder: (handler: ChordHandler<E>) => void,
): void {
  const handler: ChordHandler<E> = {
    on(chords: ChordInput, callback: ChordMatchCallback<E>): ChordHandler<E> {
      if (Array.isArray(chords)) {
        if (isChordPressed(event, ...chords)) {
          callback(event);
        }
      } else {
        if (isChordPressed(event, chords)) {
          callback(event);
        }
      }

      return handler;
    },
  };

  return builder(handler);
}
