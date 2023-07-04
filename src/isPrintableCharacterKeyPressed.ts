/**
 * Returns true if a printable character key was pressed (excluding any
 * modifiers).
 */
export function isPrintableCharacterKeyPressed(event: KeyboardEvent): boolean {
  // prettier-ignore
  if ([event.altKey, event.ctrlKey, event.metaKey, event.shiftKey].some(Boolean)) {
    return false;
  }

  const { code } = event;

  return [
    code.startsWith("Key"),
    code.startsWith("Digit"),
    code === "Backspace",
    code === "Delete",
  ].some(Boolean);
}
