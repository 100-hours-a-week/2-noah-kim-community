import InlineComponent from '../InlineComponent.js'

class Modal extends InlineComponent {
  setup() {
    this.loadStyles()
  }

  loadStyles() {
    super.loadStyles('/components/common/Modal/Modal.css')
  }

  template() {
    const { title, message, confirmText, cancelText } = this.$props
    return `
      <div class="modal-overlay">
        <div class="modal">
          <p class="modal-title">${title}</p>
          <p class="modal-message">${message}</p>
          <div class="modal-buttons">
            <button class="modal-cancel">${cancelText || '취소'}</button>
            <button class="modal-confirm">${confirmText || '확인'}</button>
          </div>
        </div>
      </div>
    `
  }

  mounted() {
    // document.body.insertAdjacentHTML('beforeend', this.getComponent())
    document.body.appendChild(this.$target)
    document.body.style.overflow = 'hidden' //스크롤 막기

    // DOM 요소 저장
    this.$elements = {
      modalElement: this.$target.querySelector('.modal-overlay'),
      cancelButton: this.$target.querySelector('.modal-cancel'),
      confirmButton: this.$target.querySelector('.modal-confirm'),
    }
  }

  setEvent() {
    const { onConfirm, onCancel } = this.$props

    this.$elements.cancelButton.addEventListener('click', () => {
      if (onCancel) onCancel()
      this.close()
    })

    this.$elements.confirmButton.addEventListener('click', () => {
      if (onConfirm) onConfirm()
      this.close()
    })
  }

  close() {
    if (this.$target) {
      this.$target.remove()

      document.body.style.overflow = '' // 스크롤 다시 가능
    }
  }
}

export default Modal
