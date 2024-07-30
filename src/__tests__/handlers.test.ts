import { handleChord, handleChords } from "../handlers.ts";
import { Key, Modifier } from "../types.ts";

describe("within handlers", () => {
  describe("the handleChord function", () => {
    it("only fires the handler when a single chord is pressed", () => {
      const handlerFired = vi.fn();

      const event = new KeyboardEvent("keydown", { key: "c", altKey: true });

      handleChord(event, Modifier.Alt | Key.LetterC, () => {
        handlerFired();
      });

      expect(handlerFired).toHaveBeenCalled();
    });
  });

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

    it("handles arrow keys", () => {
      const handlerFired = vi.fn();
      const handlerNotFired = vi.fn();

      const event = new KeyboardEvent("keydown", {
        key: "ArrowDown",
        altKey: true,
        cancelable: true,
      });

      handleChords(event, (handler) => {
        handler
          .on(Modifier.Alt | Key.ArrowDown, () => {
            handlerFired();
          })
          .on(Key.ArrowDown, () => {
            handlerNotFired();
          })
          .on([Modifier.Alt | Key.ArrowDown, Key.ArrowDown], (event) => {
            handlerFired();
            event.preventDefault();
          });
      });

      expect(handlerFired).toHaveBeenCalledTimes(2);
      expect(handlerNotFired).not.toHaveBeenCalledTimes(1);
      expect(event.defaultPrevented).toBe(true);
    });
  });
});
