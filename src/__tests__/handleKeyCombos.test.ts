import { handleKeyCombos } from "../handleKeyCombos.js";
import { Key, Modifier } from "../types.js";

describe("the handleKeyCombos function", () => {
  it("only fires the handler when the key combo is pressed", () => {
    const handlerFired = vi.fn();
    const handlerNotFired = vi.fn();

    const event = new KeyboardEvent("keydown", { code: "KeyC", altKey: true });

    handleKeyCombos(event, {
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
