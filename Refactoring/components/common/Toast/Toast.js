import InlineComponent from '../InlineComponent.js'

class Toast extends InlineComponent {
  setup() {
    this.loadStyles()
  }

  loadStyles() {
    super.loadStyles('/components/common/Toast/Toast.css')
  }

  template() {
    const { message } = this.$props
    return `
      <div class="toast">${message}</div>
    `
  }
  mounted() {
    // DOM 요소 저장
    this.$elements = {
      toasts: document.getElementsByClassName('toast'),
    }
  }

  setEvent() {}
}

export default Toast
