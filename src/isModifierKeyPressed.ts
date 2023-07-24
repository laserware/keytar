import { Modifier } from "./types.js";

/**
 * Returns true if the specified modifier key is pressed.
 * @param event
 * @param modifier
 */
export function isModifierKeyPressed(
  event: KeyboardEvent | MouseEvent,
  modifier: Modifier,
): boolean {
  switch (modifier) {
    case Modifier.Alt:
      return event.altKey;

    case Modifier.Ctrl:
      return event.ctrlKey;

    case Modifier.Cmd:
      return event.metaKey;

    case Modifier.CmdOrCtrl:
      return event.metaKey || event.ctrlKey;

    case Modifier.Shift:
      return event.shiftKey;

    default:
      return false;
  }
}
