import { keyByCodeTable } from "./codeByKeyTable.js";
import { Modifier } from "./types.js";

/**
 * Returns the modifier combination extrapolated from the specified keyboard or
 * mouse event.
 * @param event Keyboard or mouse event from an event listener
 */
export function eventToModifierCombo(
  event: KeyboardEvent | MouseEvent,
): number {
  let combo = 0;

  if ("code" in event) {
    combo = combo | (keyByCodeTable[event.code] ?? 0);
  }

  if ("buttons" in event) {
    combo = combo | event.buttons;
  }

  if (event.altKey) {
    combo = combo | Modifier.Alt;
  }

  if (event.ctrlKey) {
    combo = combo | Modifier.Ctrl;
  }

  if (event.metaKey) {
    combo = combo | Modifier.Cmd;
  }

  if (event.shiftKey) {
    combo = combo | Modifier.Shift;
  }

  return combo;
}
