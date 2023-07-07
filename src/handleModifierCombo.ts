import type { ComboHandler } from "./types.js";

/**
 * Fires the handler that maps to the specified modifier combination.
 * @param modifierCombo Modifier(s) to fire handler for.
 * @param handlers
 */
export function handleModifierCombo(
  modifierCombo: number,
  handlers: Record<number, ComboHandler>,
): void {
  for (const [combo, func] of Object.entries(handlers)) {
    if (Number(combo) === modifierCombo) {
      func();
    }
  }
}
