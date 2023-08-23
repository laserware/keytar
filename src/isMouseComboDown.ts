import { isKeyComboDown } from "./isKeyComboDown.js";
import { MouseButton } from "./types.js";

/**
 * Returns true if the specified mouse button and modifier key combination is
 * pressed.
 * @param event Mouse event from an event listener
 * @param combo Combination of mouse button and modifier keys to check for from the event
 */
export function isMouseComboDown(event: MouseEvent, combo: number): boolean {
  let keyCode = combo;

  const mouseButton = event.buttons as MouseButton;

  if (mouseButton === MouseButton.Left) {
    if ((combo & MouseButton.Left) === MouseButton.Left) {
      keyCode = keyCode & ~MouseButton.Left;
    } else {
      return false;
    }
  }

  if (mouseButton === MouseButton.Right) {
    if ((combo & MouseButton.Right) === MouseButton.Right) {
      keyCode = keyCode & ~MouseButton.Right;
    } else {
      return false;
    }
  }

  if (mouseButton === MouseButton.Auxiliary) {
    if ((combo & MouseButton.Auxiliary) === MouseButton.Auxiliary) {
      keyCode = keyCode & ~MouseButton.Auxiliary;
    } else {
      return false;
    }
  }

  if (mouseButton === MouseButton.BrowserBack) {
    if ((combo & MouseButton.BrowserBack) === MouseButton.BrowserBack) {
      keyCode = keyCode & ~MouseButton.BrowserBack;
    } else {
      return false;
    }
  }

  if (mouseButton === MouseButton.BrowserForward) {
    if ((combo & MouseButton.BrowserForward) === MouseButton.BrowserForward) {
      keyCode = keyCode & ~MouseButton.BrowserForward;
    } else {
      return false;
    }
  }

  if (keyCode === 0) {
    return true;
  }

  return isKeyComboDown(event, keyCode);
}
