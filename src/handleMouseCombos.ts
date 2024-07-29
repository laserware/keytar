import { isMouseComboDown } from "./isMouseComboDown.ts";
import type { ComboHandler } from "./types.ts";

/**
 * Fires the handler that maps to the specified modifier and mouse button
 * combination for the mouse event.
 *
 * @param event Mouse event from an event listener.
 * @param handlers Handlers that map to modifier and mouse button combinations.
 *
 * @example
 * function handleMouseDown(event: MouseEvent): void {
 *   handleMouseCombos(event, {
 *     [Modifier.Shift | MouseButton.Left]() {
 *       // This function gets called if the user _only_ holds down the Shift
 *       // key while clicking the left mouse button.
 *     },
 *   });
 * }
 */
export function handleMouseCombos(
  event: MouseEvent,
  handlers: Record<number, ComboHandler>,
): boolean {
  for (const [combo, func] of Object.entries(handlers)) {
    if (isMouseComboDown(event, Number(combo))) {
      return func() ?? false;
    }
  }

  return false;
}
