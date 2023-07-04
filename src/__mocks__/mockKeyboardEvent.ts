export function mockKeyboardEvent({
  code,
  altKey = false,
  ctrlKey = false,
  metaKey = false,
  shiftKey = false,
}: {
  code?: string;
  altKey?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
}): KeyboardEvent {
  return {
    code,
    altKey,
    ctrlKey,
    metaKey,
    shiftKey,
    preventDefault() {
      // Do nothing.
    },
  } as unknown as KeyboardEvent;
}
