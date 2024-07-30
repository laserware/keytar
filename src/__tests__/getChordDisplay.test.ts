import { getChordDisplay } from "../getChordDisplay.ts";
import { EventButton, Key, Modifier, MouseButton } from "../types.ts";

vi.mock("@laserware/arcade", async (importActual) => {
  const mod = await importActual();

  return {
    // @ts-ignore
    ...mod,
    // @ts-ignore
    cachePlatform: () => mod.Platform.Mac,
  };
});

describe("the getChordDisplay function", () => {
  it("returns the display for a chord", () => {
    const result = getChordDisplay(Modifier.Alt | Modifier.Shift | Key.LetterC | MouseButton.Left);

    expect(result).toBe("⌥ + Shift + Left Click + C");
  });

  it("returns the chord display for a keyboard event", () => {
    const event = new KeyboardEvent("keydown", { key: "ArrowDown", altKey: true });

    const result = getChordDisplay(event);

    expect(result).toBe("⌥ + ▼");
  });

  it("returns the chord display for a mouse event", () => {
    const event = new MouseEvent("mousedown", {
      buttons: EventButton.Left,
      altKey: true,
      ctrlKey: true,
      shiftKey: true,
      metaKey: true,
    });

    const result = getChordDisplay(event);

    expect(result).toBe("⌥ + ⌃ + ⌘ + Shift + Left Click");
  });
});