import InlineComponent from '../InlineComponent.js'

class Button extends InlineComponent {
  setup() {
    this.loadStyles()
  }
  loadStyles() {
    super.loadStyles('/components/common/Button/Button.css')
  }

  template() {
    const { text } = this.$props
    return `<button class='button-component'>${text}</button>`
  }

  setEvent() {
    const { onClick } = this.$props

    const btn = document.querySelector('.button-component')

    if (btn) {
      btn.addEventListener('click', () => alert('hello1'))
    }
  }
}

export default Button
