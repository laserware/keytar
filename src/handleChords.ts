import { isChordPressed } from "./isChordPressed.ts";
import type { ChordedEvent } from "./types.ts";

/**
 * Listener fired when a matching chord is found.
 *
 * @template E Keyboard or mouse event.
 */
export type ChordMatchListener<E extends ChordedEvent> = (event: E) => void;

/**
 * Input for chords, can be a single chord combination or an array of chord
 * combinations.
 */
export type ChordInput = number | number[];

/**
 * Condition passed to {@linkcode ChordHandler.when}.
 *
 * @template E Keyboard or mouse event.
 */
export type WhenCondition<E extends ChordedEvent> =
  | ((event: E) => boolean)
  | boolean;

/**
 * Object with handlers that get fired based on the conditional checks.
 *
 * @template E Keyboard or mouse event.
 */
export interface ChordHandler<E extends ChordedEvent> {
  /**
   * Fired when the specified chord or array of chords is pressed.
   *
   * @param chords Single chord or array of chords that represent a combination of {@linkcode Token}
   *               elements that meet the conditions in the specified event.
   * @param listener Callback to fire if a chord match is found.
   */
  on(chords: ChordInput, listener: ChordMatchListener<E>): ChordHandler<E>;

  /**
   * Fired when the specified condition is met.
   *
   * @param condition Either a boolean value or a function that returns a boolean.
   * @param listener Callback to fire if the condition is true.
   */
  when(
    condition: WhenCondition<E>,
    listener: ChordMatchListener<E>,
  ): ChordHandler<E>;
}

/**
 * Builder function for a {@linkcode ChordHandler}.
 *
 * @template E Keyboard or mouse event.
 */
export type ChordHandlerBuilder<E extends ChordedEvent> = (
  handler: ChordHandler<E>,
) => void;

/**
 * Fires the specified `listener` if the specified combination of `chords`
 * were pressed/clicked from the specified `event`.
 *
 * @template E Keyboard or mouse event.
 *
 * @param event Keyboard or mouse event from an event listener.
 * @param chords Single chord or array of chords that represent a combination of {@linkcode Token}
 *               elements that meet the conditions in the specified event.
 * @param listener Callback to fire if a chord match is found.
 *
 * @example
 * **Single Chord Input**
 *
 * ```ts
 * function handleKeyDown(event: KeyboardEvent): void {
 *   handleChords(event, Modifier.Alt | Key.LetterC, () => {
 *     // Fired only when Alt + C is pressed.
 *   });
 * }
 * ```
 *
 * **Multiple Chord Input**
 *
 * ```ts
 * function handleKeyDown(event: KeyboardEvent): void {
 *   handleChords(event, [Modifier.Alt | Key.LetterC, Key.LetterC], (event) => {
 *     // Fired when Alt + C or the letter C is pressed.
 *
 *     // Event can be accessed from the listener if needed:
 *     event.preventDefault();
 *   });
 * }
 * ```
 */
export function handleChords<E extends ChordedEvent>(
  event: E,
  chords: ChordInput,
  listener: ChordMatchListener<E>,
): void;

/**
 * Fires the handlers that map to the specified `builder` describing the
 * combinations of {@linkcode Token} elements or conditions for the
 * specified keyboard or mouse `event`.
 *
 * @template E Keyboard or mouse event.
 *
 * @param event Keyboard or mouse event from an event listener.
 * @param builder Builder that adds handlers that map to key combinations and mouse
 *                buttons.
 *
 * @example
 * function handleKeyDown(event: KeyboardEvent): void {
 *   handleChords(event, (handler) => {
 *     handler
 *       .on(Modifier.Alt | Key.LetterC, () => {
 *         // Fired only when Alt + C is pressed.
 *       })
 *       .on(Key.LetterC, () => {
 *         // Fired only when C is pressed (without modifiers).
 *       })
 *       .on([Modifier.Alt | Key.LetterC, Key.LetterC], (event) => {
 *         // Fired when Alt + C _or_ C is pressed.
 *
 *         // Event can be accessed from the listener if needed:
 *         event.preventDefault();
 *       })
 *       // Passing in a function that takes an Event as its first argument:
 *       .when(isPrintableCharPressed, () => {
 *         // A letter or number was pressed.
 *       })
 *       // Passing in a boolean:
 *       .when(isPrintableCharPressed(event), () => {
 *         // A letter or number was pressed.
 *       })
 *    });
 * }
 */
export function handleChords<E extends ChordedEvent>(
  event: E,
  builder: ChordHandlerBuilder<E>,
): void;

export function handleChords<E extends ChordedEvent>(
  event: E,
  chordsOrBuilder: ChordInput | ChordHandlerBuilder<E>,
  listener?: ChordMatchListener<E>,
): void {
  if (isChordInput(chordsOrBuilder)) {
    if (typeof listener !== "function") {
      throw new Error("Listener must be specified if chord or chords are used");
    }

    return handleChord(event, chordsOrBuilder, listener);
  }

  // biome-ignore format:
  const handler: ChordHandler<E> = {
    on(chords: ChordInput, listener: ChordMatchListener<E>): ChordHandler<E> {
      handleChord(event, chords, listener);

      return handler;
    },
    when(condition: WhenCondition<E>, listener: ChordMatchListener<E>): ChordHandler<E> {
      const result = typeof condition === "function" ? condition(event) : condition;

      if (result) {
        listener(event);
      }

      return handler;
    },
  };

  return chordsOrBuilder(handler);
}

function handleChord<E extends ChordedEvent>(
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

function isChordInput(input: unknown): input is ChordInput {
  return Array.isArray(input) || typeof input === "number";
}
