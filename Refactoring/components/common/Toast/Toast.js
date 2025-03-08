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
    document.body.appendChild(this.$target)

    this.$elements = {
      toasts: document.getElementsByClassName('toast'),
    }
  }

  setEvent() {
    // 2초 뒤에 언마운트
    setTimeout(() => {
      const toastElements = this.$elements.toasts
      if (toastElements !== 0) {
        Array.from(toastElements).forEach(toast => toast.remove())
      } else {
        console.error('❌ this.$target가 존재하지 않음!')
      }
    }, 2000)
    // DOM 요소 저장
  }
}

export default Toast
