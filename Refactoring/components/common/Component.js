class Component {
  $target
  $props
  $state
  $elements // 사용하는 DOM 요소들 (재사용성을 위해 설정)

  /** 컴포넌트가 표시될 타겟 지정 */
  constructor($target, $props) {
    this.$target = $target
    this.$props = $props

    this.setup()
    this.render()
    this.setEvent()
  }

  /** 상태 정의 및 기본값 저장 */
  setup() {}

  /** HTML 템플릿 저장 */
  template() {
    return ''
  }

  setEvent() {}

  /** 이벤트 등록 추상화 */
  /** 이벤트 등록 추상화 (이제 selector 대신 요소를 직접 받음) */
  addEvent(eventType, element, callback) {
    if (!element) {
      console.error(`❌ 이벤트를 추가할 요소가 존재하지 않습니다.`)
      return
    }

    element.addEventListener(eventType, event => {
      callback(event)
    })
  }

  render() {
    this.$target.innerHTML = this.template() //UI 렌더링
    this.mounted()
  }

  /** 자식 컴포넌트 및 요소 정의 */
  mounted() {}

  setState(newState) {
    this.state = { ...this.state, ...newState }
    this.render()
  }

  /** CSS 불러오기 */
  /** TODO: 스타일 없을때 에러처리 */
  loadStyles(stylePath) {
    if (!stylePath) return

    // 이미 로드된 스타일인지 확인 (중복 로드 방지)
    if (document.querySelector(`link[href="${stylePath}"]`)) return

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = stylePath
    link.setAttribute('data-dynamic-style', stylePath) // 동적 스타일 태그 관리
    document.head.appendChild(link)
  }
}

export default Component
