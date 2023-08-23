import { cachePlatform, Platform } from "@laserware/arcade";

import { codeByKeyTable } from "./codeByKeyTable.js";
import type { Key } from "./types.js";
import { Modifier } from "./types.js";

const platform = cachePlatform();

/**
 * Returns the platform-dependent display value for the specified modifier.
 */
export function getDisplayValueForModifier(modifier: Modifier): string {
  switch (modifier) {
    case Modifier.Cmd:
      return platform === Platform.Mac ? "⌘" : "Meta";

    case Modifier.Ctrl:
      return platform === Platform.Mac ? "⌃" : "Ctrl";

    case Modifier.CmdOrCtrl:
      return platform === Platform.Mac ? "⌘" : "Ctrl";

    case Modifier.Alt:
      return platform === Platform.Mac ? "⌥" : "Alt";

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
