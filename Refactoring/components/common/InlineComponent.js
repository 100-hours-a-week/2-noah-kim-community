class InlineComponent {
  $element
  $props
  $state

  constructor($props) {
    this.$props = $props
    this.setup()
    this.bindEvents()
  }

  setup() {}

  /** HTML 템플릿 저장 */
  template() {
    return ''
  }

  /** 템플릿을 실제 요소로 변환  */
  bindEvents() {
    const wrapper = document.createElement('div') // 임시 요소
    wrapper.innerHTML = this.template().trim()
    this.$element = wrapper.firstChild

    if (!this.$element) return

    this.setEvent()
  }

  setEvent() {}

  /** 컴포넌트 표시 메소드  */
  render() {
    return this.$element?.outerHTML || ''
  }

  setState(newState) {
    this.$state = { ...this.$state, ...newState }
    this.bindEvents() // UI를 다시 그려서 상태 반영
  }

  /** CSS 불러오기 */
  /** TODO: 스타일 없을때 에러처리 */
  loadStyles(stylePath) {
    if (!stylePath) return
    if (document.querySelector(`link[href="${stylePath}"]`)) return

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = stylePath
    document.head.appendChild(link)
  }
}

export default InlineComponent
