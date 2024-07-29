import { isPlatform } from "@laserware/arcade";

import { codeByKeyTable } from "./codeByKeyTable.ts";
import { Key, Modifier } from "./types.ts";

/**
 * Returns true if the specified single combination is pressed based on the
 * specified keyboard or mouse event.
 * @param event Keyboard or mouse event from an event listener
 * @param combo Combination of keys to check for from the event
 */
export function isKeyComboDown(
  event: KeyboardEvent | MouseEvent,
  combo: number,
): boolean {
  let keyCode = combo;

  /*
   * Since the `Modifier.CmdOrCtrl` flag is a bitwise OR of `Modifier.Cmd` and
   * `Modifier.Ctrl`, we want to clear the flag for the modifier that _isn't_
   * associated with that platform. So on macOS, we clear the `Modifier.Ctrl`
   * flag since we're checking if `Modifier.Cmd` was pressed. On Linux/Windows,
   * we clear `Modifier.Cmd` (or Windows key), since we're checking if
   * `Modifier.Ctrl` was pressed.
   */
  if ((combo & Modifier.CmdOrCtrl) === Modifier.CmdOrCtrl) {
    if (isPlatform("mac")) {
      if (event.metaKey) {
        keyCode = keyCode & ~Modifier.Ctrl;
      } else {
        return false;
      }
    } else {
      if (event.ctrlKey) {
        keyCode = keyCode & ~Modifier.Cmd;
      } else {
        return false;
      }
    }
  }

  if ((combo & Modifier.Cmd) === Modifier.Cmd && event.metaKey) {
    keyCode = keyCode & ~Modifier.Cmd;
  } else if (event.metaKey) {
    return false;
  }

  if ((combo & Modifier.Ctrl) === Modifier.Ctrl && event.ctrlKey) {
    keyCode = keyCode & ~Modifier.Ctrl;
  } else if (event.ctrlKey) {
    return false;
  }

  if ((combo & Modifier.Alt) === Modifier.Alt && event.altKey) {
    keyCode = keyCode & ~Modifier.Alt;
  } else if (event.altKey) {
    return false;
  }

  if ((combo & Modifier.Shift) === Modifier.Shift && event.shiftKey) {
    keyCode = keyCode & ~Modifier.Shift;
  } else if (event.shiftKey) {
    return false;
  }

  if (keyCode === 0) {
    return true;
  }

  const tableKey = keyCode as Key;

  // @ts-expect-error: If this was a MouseEvent, the `keyCode === 0` check would have caught it.
  return event.code === codeByKeyTable[tableKey];
}
