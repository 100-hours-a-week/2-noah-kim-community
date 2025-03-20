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

  mounted() {}

  setEvent() {
    const { onClick } = this.$props

    this.addEvent(this.$target, 'click', onClick)
  }
}

export default Button
