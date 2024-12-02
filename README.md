# Keytar

Handle keyboard and mouse events using bitflags.
Check out the [documentation](https://laserware.github.io/keytar/) for the API.

## Overview

This library uses bitflags to check for mouse and keyboard event conditions.
If you're interested in how I implemented it and the reasoning behind it, check out [this blog post I wrote](https://mikerourke.dev/blog/bitwisdom-keyboard-shortcuts/).

Here's what this looks like in practice:

```ts
import { handleChords, Key, Modifier } from "@laserware/keytar";

function handleKeyDown(event: KeyboardEvent): void {
  const isShiftDown = (event: KeyboardEvent): boolean => {
    return event.shiftKey;
  };
  
  const isCtrlDown = (event: KeyboardEvent): boolean => {
    return event.ctrlKey;
  };
  
  handleChords(event, (handler) => {
    handler
      .on(Key.LetterE, () => {
        // This is fired _only_ when the letter "E" is pressed.
        // If Shift + E is pressed, this condition won't be hit.
      })
      .on(Modifier.Ctrl | Key.LetterK, () => {
        // This is fired _only_ when Ctrl + K is pressed.
      })
      .on([Modifier.Ctrl | Key.LetterP, Modifier.Ctrl | Key.LetterQ], () => {
        // This is fired _only_ when Ctrl + P _or_ Ctrl + Q is pressed.
      })
      // Pass a function reference that returns a boolean
      // (first arg is the Event):
      .when(isShiftDown, () => {
        // This is fired whenever the Shift key is pressed.
      })
      // Call the function directly and return a boolean:
      .when(isCtrlDown(event), () => {
        // This is fired whenever the Ctrl key is pressed.
      })
      // Or just specify a boolean condition:
      .when(event.altKey, () => {
        // This is fired whenever the Alt key is pressed.
      })
  });
}
```

## Glossary

The following terms are used throughout the codebase to describe operations that can be performed with either the keyboard or mouse.

- A `Key` is any non-modifier keyboard key (e.g. the letter `a` or the `Delete` key).
- A `Modifier` is the modifier key that can be used in combination with a `Key` (e.g. `Shift` or `Alt`).
- A `MouseButton` represents the clicked button that corresponds to the [MouseEvent.buttons](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons) property.
- A `Token` can be a `Key`, `Modifier`, or `MouseButton` (i.e. a union type).
- A `Chord` is a `Token` or `number` that represents a combination of `Token` values combined using the [bitwise OR (`|`) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR).
