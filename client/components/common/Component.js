import BaseComponent from './BaseComponent.js'

class Component extends BaseComponent {
  render() {
    super.render()

    this.$target.innerHTML = this.template() //UI 렌더링
    this.mounted()
    this._effectManager.runEffects?.() // useEffect 등록
  }
}

export default Component
