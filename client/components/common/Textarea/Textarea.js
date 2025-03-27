import InlineComponent from '../InlineComponent.js'

class Textarea extends InlineComponent {
  setup() {
    this.loadStyles()
  }
  loadStyles() {
    super.loadStyles('/components/common/Textarea/Textarea.css')
  }

  template() {
    const { id, type, value, placeholder } = this.$props

    return `
      <textarea
        type=${type}
        id="${id || ''}" 
        placeholder="${placeholder || ''}"
      >
        ${value ?? ''}
      </textarea>
    `
  }

  mounted() {
    const { id, value } = this.$props
    this.$elements = {
      textareaElement: this.$target,
    }

    this.$elements.textareaElement.value = value ?? ''
  }

  setEvent() {
    this.addEvent(this.$target, 'blur', () => {
      const { changeHandler, callback } = this.$props

      const value = this.$target?.value ?? ''
      changeHandler(value)
    })
  }
}

export default Textarea
