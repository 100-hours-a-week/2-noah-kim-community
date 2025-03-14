import Button from '../Button/Button.js'
import PortalComponent from '../PortalComponent.js'

class Modal extends PortalComponent {
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
            <button id="modal-cancel"></button>
            <button id="modal-confirm"></button>
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
      cancelButton: this.$target.querySelector('#modal-cancel'),
      confirmButton: this.$target.querySelector('#modal-confirm'),
    }

    // 자식 요소 정의
    const { confirmText, cancelText } = this.$props

    console.log(this.$elements.cancelButton)

    new Button(this.$elements.cancelButton, {
      text: cancelText || '취소',
      onClick: this.cancelHandler.bind(this),
      idName: 'modal-cancel',
    })

    new Button(this.$elements.confirmButton, {
      text: confirmText || '확인',
      onClick: this.confirmHandler.bind(this),
      idName: 'modal-confirm',
    })
  }

  setEvent() {}

  close() {
    if (this.$target) {
      this.$target.remove()

      document.body.style.overflow = '' // 스크롤 다시 가능
    }
  }

  cancelHandler() {
    const { onCancel } = this.$props

    if (onCancel) onCancel()
    this.close()
  }

  confirmHandler() {
    const { onConfirm } = this.$props

    if (this.$props.onConfirm) onConfirm()
    this.close()
  }
}

export default Modal
