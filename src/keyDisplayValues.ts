import { isPlatform } from "@laserware/arcade";

import { eventKeyByKeyEnumTable } from "./keyTables.ts";
import { Modifier, type Key } from "./types.ts";

/**
 * Returns the platform-dependent display value for the specified modifier.
 */
export function getDisplayValueForModifier(modifier: Modifier): string {
  switch (modifier) {
    case Modifier.Cmd:
      return isPlatform("mac") ? "⌘" : "Meta";

    case Modifier.Ctrl:
      return isPlatform("mac") ? "⌃" : "Ctrl";

    case Modifier.CmdOrCtrl:
      return isPlatform("mac") ? "⌘" : "Ctrl";

    case Modifier.Alt:
      return isPlatform("mac") ? "⌥" : "Alt";

    case Modifier.Shift:
      return "Shift";
  }
}

/**
 * Returns the value to display for the specified key or code.
 */
export function getDisplayValueForKey(
  keyEnumOrEventKey: number | string,
): string {
  const eventKey =
    typeof keyEnumOrEventKey === "number"
      ? eventKeyByKeyEnumTable[keyEnumOrEventKey as Key]
      : keyEnumOrEventKey;

  if (eventKey === undefined) {
    throw new Error(`Unknown key: ${keyEnumOrEventKey}`);
  }

  switch (eventKey) {
    case "ArrowDown":
      return "▼";

    case "ArrowLeft":
      return "◀";

    case "ArrowRight":
      return "▶";

    case "ArrowUp":
      return "▲";

    case "Backslash":
      return "\\";

    case "BracketLeft":
      return "[";

    case "BracketRight":
      return "]";

    case "Comma":
      return ",";

    case "Equal":
      return "+";

    case "Escape":
      return "Esc";

    case "Minus":
      return "-";

    case "Slash":
      return "/";

    default:
      return eventKey;
  }
}
