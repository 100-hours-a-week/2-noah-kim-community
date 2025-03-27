import BaseComponent from './BaseComponent.js'

class Component extends BaseComponent {
  render() {
    super.render()
    this.$target.innerHTML = this.template() //UI 렌더링
    this.mounted()
  }
}

export default Component
