import { describe, expect, it, mock } from "bun:test";

import { handleChords } from "../handleChords.ts";
import { isPrintableCharPressed } from "../printableChars.ts";
import { Key, Modifier } from "../types.ts";

describe("the handleChords function", () => {
  describe("when using the match and listener arguments", () => {
    it("only fires the handler when a single chord is pressed", () => {
      const handlerFired = mock();

      const event = new KeyboardEvent("keydown", {
        key: "c",
        altKey: true,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
      });

      handleChords(event, Modifier.Alt | Key.LetterC, () => {
        handlerFired();
      });

      expect(handlerFired).toHaveBeenCalled();
    });
  });

  describe("when using the builder function", () => {
    it("only fires the handler when the key chord is pressed", () => {
      const handlerFired = mock();
      const handlerNotFired = mock();

      const event = new KeyboardEvent("keydown", {
        key: "c",
        altKey: true,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
        cancelable: true,
      });

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
      expect(event.defaultPrevented).toBeTruthy();
    });

    it("handles arrow keys", () => {
      const handlerFired = mock();
      const handlerNotFired = mock();

      const event = new KeyboardEvent("keydown", {
        key: "ArrowDown",
        altKey: true,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
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
      expect(event.defaultPrevented).toBeTruthy();
    });

    it("handles when handlers", () => {
      const handlerFired = mock();

      const event = new KeyboardEvent("keydown", {
        key: "a",
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
      });

      handleChords(event, (handler) => {
        handler
          .when(isPrintableCharPressed, () => {
            handlerFired();
          })
          .when(isPrintableCharPressed(event), () => {
            handlerFired();
          });
      });

      expect(handlerFired).toHaveBeenCalledTimes(2);
    });
  });
});
