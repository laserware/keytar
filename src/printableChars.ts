import type { ChordedEvent } from "./types.ts";

/**
 * Returns true if a printable character key was pressed (excluding any
 * modifiers).
 *
 * @param event Keyboard event from an event listener.
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
 * Returns true if the specified key represents a printable character.
 *
 * @param key Key to check if printable.
 */
export function isPrintableChar(key: string): boolean {
  if (/[a-z0-9]/gi.test(key)) {
    return true;
  }

  // noinspection RedundantIfStatementJS
  if (key === "Backspace" || key === "Delete") {
    return true;
  }

  return false;
}
