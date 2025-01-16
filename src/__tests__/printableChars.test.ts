import { describe, expect, it } from "bun:test";

import { isPrintableChar, isPrintableCharPressed } from "../printableChars.ts";

describe("within printableChars", () => {
  describe("the isPrintableChar function", () => {
    it("returns true for lowercase letters", async () => {
      expect(isPrintableChar("a")).toBeTruthy();
    });

    it("returns true for uppercase letters", async () => {
      expect(isPrintableChar("A")).toBeTruthy();
    });

    it("returns true for numbers", async () => {
      expect(isPrintableChar("5")).toBeTruthy();
    });

    it("returns true for the Backspace key", async () => {
      expect(isPrintableChar("Backspace")).toBeTruthy();
    });

    it("returns true for the Delete key", async () => {
      expect(isPrintableChar("Delete")).toBeTruthy();
    });

    it("returns false for non-printable keys", async () => {
      expect(isPrintableChar("Tab")).toBeFalsy();
    });

    it("returns false when a modifier key is pressed", async () => {
      expect(isPrintableChar("Ctrl+a")).toBeFalsy();
    });
  });

  describe("the isPrintableCharPressed function", () => {
    it("returns true for lowercase letters", async () => {
      const event = new KeyboardEvent("keydown", { key: "a" });

      expect(isPrintableCharPressed(event)).toBeTruthy();
    });

    it("returns true for uppercase letters", async () => {
      const event = new KeyboardEvent("keydown", { key: "A" });

      expect(isPrintableCharPressed(event)).toBeTruthy();
    });

    it("returns true for numbers", async () => {
      const event = new KeyboardEvent("keydown", { key: "5" });

      expect(isPrintableCharPressed(event)).toBeTruthy();
    });

    it("returns true for the Backspace key", async () => {
      const event = new KeyboardEvent("keydown", { key: "Backspace" });

      expect(isPrintableCharPressed(event)).toBeTruthy();
    });

    it("returns true for the Delete key", async () => {
      const event = new KeyboardEvent("keydown", { key: "Delete" });

      expect(isPrintableCharPressed(event)).toBeTruthy();
    });

    it("returns false for non-printable keys", async () => {
      const event = new KeyboardEvent("keydown", { key: "Tab" });

      expect(isPrintableCharPressed(event)).toBeFalsy();
    });

    it("returns false when a modifier key is pressed", async () => {
      const event = new KeyboardEvent("keydown", { key: "a", ctrlKey: true });

      expect(isPrintableCharPressed(event)).toBeFalsy();
    });

    it("returns false for mouse events", async () => {
      const event = new MouseEvent("click");

      expect(isPrintableCharPressed(event)).toBeFalsy();
    });
  });
});
