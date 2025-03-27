export class StateManager {
  component // 실행될 BaseComponent
  cursor // useState가 실행된 횟수
  states // state를 보관할 배열

  constructor(component) {
    this.component = component
    this.cursor = 0
    this.states = []
  }

  resetCursor() {
    this.cursor = 0
  }

  useState(initialValue) {
    const index = this.cursor

    if (this.states[index] === undefined) {
      this.states[index] = initialValue
    }

    const setValue = newValue => {
      this.states[index] = typeof newValue === 'function' ? newValue(this.states[index]) : newValue

      this.component.render()
      this.component.setEvent()
      this.component.runEffects?.()
    }

    const value = this.states[index]
    this.cursor++
    return [value, setValue]
  }
}
