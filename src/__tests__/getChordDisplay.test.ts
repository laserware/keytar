import { describe, expect, it } from "bun:test";

import { getChordDisplay } from "../getChordDisplay.js";
import { Key, Modifier, MouseButton, MouseEventButton } from "../types.js";

describe("the getChordDisplay function", () => {
  it("returns the display for a chord", () => {
    const result = getChordDisplay(Modifier.Alt | Modifier.Shift | Key.LetterC | MouseButton.Left);

    expect(result).toBe("⌥ + Shift + Left Click + C");
  });

  it("returns the chord display for a keyboard event", () => {
    const event = new KeyboardEvent("keydown", {
      key: "ArrowDown",
      altKey: true,
      ctrlKey: false,
      metaKey: false,
      shiftKey: false,
    });

    const result = getChordDisplay(event);

    expect(result).toBe("⌥ + ▼");
  });

  it("returns the chord display for a mouse event", () => {
    const event = new MouseEvent("mousedown", {
      buttons: MouseEventButton.Left,
      altKey: true,
      ctrlKey: true,
      metaKey: true,
      shiftKey: true,
    });

    const result = getChordDisplay(event);

    expect(result).toBe("⌥ + ⌃ + ⌘ + Shift + Left Click");
  });
});
