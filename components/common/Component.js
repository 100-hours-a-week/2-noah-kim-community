import BaseComponent from './BaseComponent.js'

class Component extends BaseComponent {
  render() {
    this.$target.innerHTML = this.template() //UI 렌더링
    this.mounted()
  }
}

export default Component
