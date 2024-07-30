import { handleChords } from "../handleChords.ts";
import { Key, Modifier } from "../types.ts";

describe("the handleChords function", () => {
  it("only fires the handler when the key chord is pressed", () => {
    const handlerFired = vi.fn();
    const handlerNotFired = vi.fn();

    const event = new KeyboardEvent("keydown", { key: "c", altKey: true, cancelable: true });

    handleChords(event, (handler) => {
      handler
        .on(Modifier.Alt | Key.LetterC, () => {
          handlerFired();
        })
        .on(Key.LetterC, () => {
          handlerNotFired();
        })
        .on([Modifier.Alt | Key.LetterC, Key.LetterC], (event) => {
          handlerFired();
          event.preventDefault();
        });
    });

    expect(handlerFired).toHaveBeenCalledTimes(2);
    expect(handlerNotFired).not.toHaveBeenCalledTimes(1);
    expect(event.defaultPrevented).toBe(true);
  });
});
