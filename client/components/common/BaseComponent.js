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
  render() {}

  /** #2 HTML 템플릿 저장 */
  template() {
    return ''
  }

  /** #2 자식 컴포넌트 및 요소 정의 */
  mounted() {}

  /** #3 컴포넌트에서 필요한 이벤트 설정 */
  setEvent() {}

  setState(newState) {
    // 1. 현재 포커스된 엘리먼트 기억
    const activeElement = document.activeElement
    const id = activeElement?.id

    this.$state = { ...this.$state, ...newState }
    this.render() // UI를 다시 그려서 상태 반영
    this.setEvent() // 새 DOM에 이벤트 다시 바인딩

    const SUPPORTED_INPUT_TYPES = ['text', 'search', 'url', 'tel', 'password']
    if (id) {
      const nextInput = document.getElementById(id)

      if (nextInput) {
        nextInput.focus()

        const inputType = nextInput.type
        if (SUPPORTED_INPUT_TYPES.includes(inputType)) {
          const len = nextInput.value.length
          nextInput.setSelectionRange(len, len)
        }
      }
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
