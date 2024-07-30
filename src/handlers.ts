import { isChordPressed } from "./isChordPressed.ts";
import type { ChordedEvent } from "./types.ts";

/**
 * Listener fired when a matching chord is found.
 */
type ChordMatchListener<E extends ChordedEvent> = (event: E) => void;

/**
 * Input for chords, can be a single chord combination or an array of chord
 * combinations.
 */
type ChordInput = number | number[];

type OnChordMatch<E extends ChordedEvent> = (
  chords: ChordInput,
  listener: ChordMatchListener<E>,
) => ChordHandler<E>;

interface ChordHandler<E extends ChordedEvent> {
  on: OnChordMatch<E>;
}

/**
 * Fires the specified listener if the specified combination of {@link Token}
 * elements were pressed/clicked from the specified event.
 *
 * @param event Keyboard or mouse event from an event listener.
 * @param chords Single chord or array of chords that represent a combination of {@link Token}
 *               elements that meet the conditions in the specified event.
 * @param listener Callback to fire if a chord match is found.
 *
 * @example Single Chord Input
 *  function handleKeyDown(event: KeyboardEvent): void {
 *    handleChord(event, Modifier.Alt | Key.LetterC, () => {
 *      // Fired only when Alt + C is pressed.
 *    });
 *  }
 *
 * @example Multiple Chord Input
 *  function handleKeyDown(event: KeyboardEvent): void {
 *    handleChord(event, [Modifier.Alt | Key.LetterC, Key.LetterC], (event) => {
 *      // Fired when Alt + C or the letter C is pressed.
 *
 *      // Event can be accessed from the listener if needed:
 *      event.preventDefault();
 *    });
 *  }
 */
export function handleChord<E extends ChordedEvent>(
  event: E,
  chords: ChordInput,
  listener: ChordMatchListener<E>,
): void {
  if (Array.isArray(chords)) {
    if (isChordPressed(event, ...chords)) {
      listener(event);
    }
  } else {
    if (isChordPressed(event, chords)) {
      listener(event);
    }
  }
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
 *
 *          // Event can be accessed from the listener if needed:
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
    on(chords: ChordInput, listener: ChordMatchListener<E>): ChordHandler<E> {
      handleChord(event, chords, listener);

      return handler;
    },
  };

  return builder(handler);
}
