import { isMouseComboDown } from "./isMouseComboDown.js";

/**
 * Returns true if one of the specified mouse button and modifier key
 * combinations is pressed.
 * @param event Mouse event from an event listener
 * @param combos Combination of mouse button and modifier keys to check for from the event
 */
export function areMouseCombosDown(
  event: MouseEvent,
  ...combos: number[]
): boolean {
  for (const combo of combos) {
    if (isMouseComboDown(event, combo)) {
      return true;
    }
  }

  return false;
}
