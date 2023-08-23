/**
 * Returns true if a printable character key was pressed (excluding any
 * modifiers).
 * @param event Keyboard event from an event listener
 */
export function isPrintableCharacterKeyPressed(event: KeyboardEvent): boolean {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    return false;
  }

  if (event.code.startsWith("Key") || event.code.startsWith("Digit")) {
    return true;
  }

  // noinspection RedundantIfStatementJS
  if (event.code === "Backspace" || event.code === "Delete") {
    return true;
  }

  return false;
}
