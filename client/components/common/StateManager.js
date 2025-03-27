export class StateManager {
  component // 실행될 BaseComponent
  cursor // useState가 실행된 횟수
  states // state를 보관할 배열

  constructor(component) {
    this.component = component
    this.cursor = 0
    this.states = []
    this.keys = []
  }

  useState(key, initialValue) {
    const index = this.cursor++

    if (this.states[index] === undefined) {
      this.states[index] = initialValue
      this.keys[index] = key
    }

    const setValue = newValue => {
      const nextValue = typeof newValue === 'function' ? newValue(this.states[index]) : newValue

      this.states[index] = nextValue

      // 상태 자동 바인딩도 갱신
      this.component[key] = nextValue

      this.component.render()
      this.component.setEvent()
      this.component.runEffects?.()
    }

    // 자동 this 바인딩
    this.component[key] = this.states[index]
    this.component[`set${this.capitalize(key)}`] = setValue

    return [this.states[index], setValue]
  }

  resetCursor() {
    this.cursor = 0
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}
