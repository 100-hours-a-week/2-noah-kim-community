class InlineComponent {
  $target
  $props
  $state
  $elements // 사용하는 DOM 요소들 (재사용성을 위해 설정)

  constructor($props) {
    this.$props = $props
    this.setup()
    this.render()
    this.setEvent()
  }

  setup() {}

  /** HTML 템플릿 저장 */
  template() {
    return ''
  }

  /** 컴포넌트에서 필요한 이벤트 설정 */
  setEvent() {}

  /** 템플릿을 실제 요소로 변환  */
  render() {
    const wrapper = document.createElement('div') // 임시 요소
    wrapper.innerHTML = this.template().trim()
    this.$target = wrapper.firstChild
    console.log('render target')
    console.log(this.$target)

    if (!this.$target) return

    this.mounted()
  }

  /** 자식 컴포넌트 및 요소 정의 */
  mounted() {}

  setState(newState) {
    this.$state = { ...this.$state, ...newState }
    this.render() // UI를 다시 그려서 상태 반영
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

  /**
   * 컴포넌트 표시 메소드
   * - 인라인 컴포넌트는 특정 DOM 위치를 지정하지 않으므로, 요소를 반환하는 메소드가 필요
   * */
  getComponent() {
    return this.$target?.outerHTML || ''
  }
}

export default InlineComponent
