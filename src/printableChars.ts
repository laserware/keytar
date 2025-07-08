import type { ChordedEvent } from "./types.js";

/**
 * Checks if a printable character key was pressed (excluding any modifiers).
 *
 * A printable character meets one of the following criteria:
 * - It is an uppercase or lowercase letter.
 * - It is a number.
 * - It is the `Backspace` or `Delete` key.
 *
 * @param event KeyboardEvent from an event listener.
 *
 * @returns `true` if the printable characters were pressed from the specified `event`.
 */
export function isPrintableCharPressed(event: ChordedEvent): boolean {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    return false;
  }

  if ("key" in event) {
    return isPrintableChar(event.key);
  } else {
    // This is a mouse event.
    return false;
  }
}

/**
 * Checks if the specified key represents a printable character.
 *
 * A printable character meets one of the following criteria:
 * - It is an uppercase or lowercase letter.
 * - It is a number.
 * - It is the `Backspace` or `Delete` key.
 *
 * @param key Key to check if printable.
 *
 * @returns `true` if the specified `key` is a printable character.
 */
export function isPrintableChar(key: string): boolean {
  if (key.match(/\S/) && key.length === 1) {
    return true;
  }

  // noinspection RedundantIfStatementJS
  if (key === "Backspace" || key === "Delete") {
    return true;
  }

  return false;
}
