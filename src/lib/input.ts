const pressed = new Set<string>()

function onKeyDown(event: KeyboardEvent) {
  pressed.add(event.code)
}

function onKeyUp(event: KeyboardEvent) {
  pressed.delete(event.code)
}

function onBlur() {
  pressed.clear()
}

/** Install global key listeners. Returns cleanup. */
export function bindKeys(): () => void {
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
  window.addEventListener('blur', onBlur)
  return () => {
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('keyup', onKeyUp)
    window.removeEventListener('blur', onBlur)
    pressed.clear()
  }
}

export function isDown(...codes: string[]): boolean {
  return codes.some((code) => pressed.has(code))
}
