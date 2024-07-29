import { isPlatform } from "@laserware/arcade";

import { codeByKeyTable } from "./codeByKeyTable.ts";
import type { Key } from "./types.ts";
import { Modifier } from "./types.ts";

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
export function getDisplayValueForKey(keyOrCode: number | string): string {
  const code =
    typeof keyOrCode === "number"
      ? codeByKeyTable[keyOrCode as Key]
      : keyOrCode;

  if (code === undefined) {
    throw new Error(`Unknown key code: ${keyOrCode}`);
  }

  if (code.startsWith("Key")) {
    return code.replace("Key", "");
  }

  if (code.startsWith("Digit")) {
    return code.replace("Digit", "");
  }

  switch (code) {
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
      return code;
  }
}
