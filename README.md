# Keytar

Handle keyboard and mouse events in the browser.
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
