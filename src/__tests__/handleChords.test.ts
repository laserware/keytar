import { handleChords } from "../handleChords.ts";
import { Key, Modifier } from "../types.ts";

describe("the handleChords function", () => {
  it("only fires the handler when the key chord is pressed", () => {
    const handlerFired = vi.fn();
    const handlerNotFired = vi.fn();

    const event = new KeyboardEvent("keydown", { key: "c", altKey: true });

    handleChords(event, {
      [Modifier.Alt | Key.LetterC]() {
        handlerFired();
      },

      [Key.LetterC]() {
        handlerNotFired();
      },
    });

    expect(handlerFired).toHaveBeenCalled();
    expect(handlerNotFired).not.toHaveBeenCalled();
  });
});
