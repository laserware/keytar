import { type ChordedEvent, Modifier } from "./types.ts";

/**
 * Returns true if the specified modifier key is pressed.
 *
 * @param event Keyboard or mouse event from an event listener.
 * @param modifier Modifier for which to check.
 */
export function isModifierPressed(
  event: ChordedEvent,
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
