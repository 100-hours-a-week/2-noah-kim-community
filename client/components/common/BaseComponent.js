import { EffectManager } from './EffectManager.js'
import { StateManager } from './StateManager.js'

class BaseComponent {
  $target
  $props
  $state
  $elements // 사용하는 DOM 요소들 (재사용성을 위해 설정)

  constructor($targetOrProps, $props) {
    /** Modal.js, InlineComponent.js */
    if (arguments.length === 1) {
      this.$props = $targetOrProps
    } else {
      /** Component.js */
      this.$target = $targetOrProps
      this.$props = $props
    }

    // Hook 시스템 초기화
    this._stateManager = new StateManager(this)
    this.useState = this._stateManager.useState.bind(this._stateManager)

    this._effectManager = new EffectManager(this)
    this.useEffect = this._effectManager.useEffect.bind(this._effectManager)

    this.setup() // #1
    this.render() // #2
    this.setEvent() // #3
  }

  /** #1 초기 State 정의, Props 불러오기, CSS 로딩 */
  setup() {}

  /** #1 CSS 불러오기 */
  loadStyles(stylePath) {
    if (!stylePath) return

    // 이미 로드된 스타일인지 확인 (중복 로드 방지)
    if (document.querySelector(`link[href="${stylePath}"]`)) return

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = stylePath
    link.setAttribute('data-dynamic-style', stylePath)
    document.head.appendChild(link)
  }

  /** #2 템플릿을 실제 요소로 변환  */
  render() {
    this._stateManager.resetCursor?.()
    this._effectManager.runEffects?.()
  }

  /** #2 HTML 템플릿 저장 */
  template() {
    return ''
  }

  /** #2 자식 컴포넌트 및 요소 정의 */
  mounted() {}

  /** #3 컴포넌트에서 필요한 이벤트 설정 */
  setEvent() {}

  setState(newState) {
    const activeElement = document.activeElement

    const isInput = activeElement && ['INPUT', 'TEXTAREA'].includes(activeElement.tagName) && activeElement.type !== 'file'
    const inputId = activeElement?.id
    const cursorPos = activeElement?.selectionStart

    this.$state = { ...this.$state, ...newState }
    this.render()
    this.setEvent()

    const SUPPORTED_SELECTION_TYPES = ['text', 'search', 'url', 'tel', 'password']

    // 입력 위치 복원
    if (isInput && inputId && SUPPORTED_SELECTION_TYPES.includes(activeElement?.type)) {
      const inputElement = document.getElementById(inputId)
      requestAnimationFrame(() => {
        const inputElement = document.getElementById(inputId)
        if (inputElement) {
          inputElement.focus()
          const len = inputElement.value.length
          inputElement.setSelectionRange(cursorPos ?? len, cursorPos ?? len)
        }
      })
    }
  }

  /** 이벤트 등록 추상화 */
  /** 이벤트 등록 추상화 (이제 selector 대신 요소를 직접 받음) */
  addEvent(element, eventType, callback) {
    if (!element) {
      console.error(`❌ 이벤트를 추가할 요소가 존재하지 않습니다.`)
      return
    }

    element.addEventListener(eventType, event => {
      callback(event)
    })
  }
}

export default BaseComponent
