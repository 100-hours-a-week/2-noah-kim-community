import BaseComponent from './BaseComponent.js'

class InlineComponent extends BaseComponent {
  /** 템플릿을 실제 요소로 변환  */
  render() {
    super.render()
    const wrapper = document.createElement('div') // 임시 래퍼 요소
    wrapper.innerHTML = this.template().trim()

    const newComponent = wrapper.firstElementChild // 첫 번째 자식 요소를 가져옴
    if (!newComponent) return

    this.$target.replaceWith(newComponent)
    this.$target = newComponent
    // id 속성 추가
    if (this.$props?.idName) {
      this.$target.id = this.$props.idName
    }
    // class 속성 추가
    if (this.$props?.className) {
      this.$target.classList.add(...this.$props.className.split(' '))
    }

    this.mounted() // mounted() 실행
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
