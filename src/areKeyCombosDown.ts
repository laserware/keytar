import { isKeyComboDown } from "./isKeyComboDown.js";

/**
 * Returns true if one of the specified keyboard combinations is pressed based
 * on the specified keyboard or mouse event.
 * @param event Keyboard or mouse event from an event listener
 * @param combos Combination of modifier keys and keys to check for from the event
 */
export function areKeyCombosDown(
  event: KeyboardEvent | MouseEvent,
  ...combos: number[]
): boolean {
  for (const combo of combos) {
    if (isKeyComboDown(event, combo)) {
      return true;
    }
  }

  return false;
}
