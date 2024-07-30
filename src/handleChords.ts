import { isChordPressed } from "./isChordPressed.ts";
import type { ChordedEvent } from "./types.ts";

type ChordMatchCallback<E extends ChordedEvent> = (event: E) => void;

interface ChordMatcher<E extends ChordedEvent> {
  isOneOf(chord: number, callback: ChordMatchCallback<E>): ChordMatcher<E>;
  isAnyOf(chords: number[], callback: ChordMatchCallback<E>): ChordMatcher<E>;
}

/**
 * Fires the matchers that map to the specified key or mouse chords for the
 * specified keyboard or mouse event.
 *
 * @param event Keyboard or mouse event from an event listener.
 * @param builder Builder that adds handlers that map to key combinations and mouse
 *                buttons.
 *
 * @example
 *  function handleKeyDown(event: KeyboardEvent): void {
 *    handleChords(event, (matcher) => {
 *      matcher
 *        .isOneOf(Modifier.Alt | Key.LetterC, () => {
 *          // Fired only when Alt + C is pressed.
 *        })
 *        .isOneOf(Key.LetterC, () => {
 *          // Fired only when C is pressed (without modifiers).
 *        })
 *        .isAnyOf([Modifier.Alt | Key.LetterC, Key.LetterC], (event) => {
 *          // Fired when Alt + C _or_ C is pressed.
 *          event.preventDefault();
 *        });
 *     });
 *  }
 */
export function handleChords<E extends ChordedEvent>(
  event: E,
  builder: (matcher: ChordMatcher<E>) => void,
): void {
  const matcher: ChordMatcher<E> = {
    isOneOf(chord: number, callback: ChordMatchCallback<E>): ChordMatcher<E> {
      if (isChordPressed(event, chord)) {
        callback(event);
      }

      return matcher;
    },

    isAnyOf(
      chords: number[],
      callback: ChordMatchCallback<E>,
    ): ChordMatcher<E> {
      if (isChordPressed(event, ...chords)) {
        callback(event);
      }

      return matcher;
    },
  };

  return builder(matcher);
}
