import BaseComponent from './BaseComponent.js'

class PortalComponent extends BaseComponent {
  /** 템플릿을 실제 요소로 변환  */
  render() {
    const wrapper = document.createElement('div') // 임시 요소
    wrapper.innerHTML = this.template().trim()
    this.$target = wrapper.firstChild

    if (!this.$target) return

    this.mounted()
  }

  /**
   * 컴포넌트 표시 메소드
   * - 인라인 컴포넌트는 특정 DOM 위치를 지정하지 않으므로, 요소를 반환하는 메소드가 필요
   * */
  getComponent() {
    return this.$target?.outerHTML || ''
  }
}

export default PortalComponent
