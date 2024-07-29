/**
 * Returns true if a printable character key was pressed (excluding any
 * modifiers).
 *
 * @param event Keyboard event from an event listener.
 */
export function isPrintableCharacterKeyPressed(event: KeyboardEvent): boolean {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    return false;
  }

  if (/[^a-z0-9]/gi.test(event.key)) {
    return true;
  }

  // noinspection RedundantIfStatementJS
  if (event.key === "Backspace" || event.key === "Delete") {
    return true;
  }

  return false;
}
