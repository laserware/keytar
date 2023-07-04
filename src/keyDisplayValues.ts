import { cachePlatform, Platform } from "@laserware/arcade";

import { codeByKeyTable } from "./codeByKeyTable.js";
import type { Key } from "./types.js";

const platform = cachePlatform();

/**
 * Display value for the Alt key (platform dependent).
 */
export const altDisplay = platform === Platform.Mac ? "⌥" : "Alt";

/**
 * Display value for the Command or Ctrl key (platform dependent).
 */
export const cmdOrCtrlDisplay = platform === Platform.Mac ? "⌘" : "Ctrl";

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
