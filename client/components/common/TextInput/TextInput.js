import InlineComponent from '../InlineComponent.js'

class TextInput extends InlineComponent {
  setup() {
    this.loadStyles()
  }
  loadStyles() {
    super.loadStyles('/components/common/TextInput/TextInput.css')
  }

  template() {
    const { id, type, value, placeholder } = this.$props
    return `
      <input 
        type=${type}
        id="${id || ''}" 
        value="${value}"
        placeholder="${placeholder || ''}" 
        class="text-input"
      />
    `
  }

  setEvent() {
    const { changeHandler } = this.$props

    this.addEvent(this.$target, 'blur', () => {
      const value = this.$target?.value ?? ''
      changeHandler(value)
    })
  }
}

export default TextInput
