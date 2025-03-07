import Toast from '../../components/common/Toast/toast.js'

export function useToast(message) {
  const toast = new Toast({ message })
  document.body.insertAdjacentHTML('beforeend', toast.getComponent())

  // 2초 뒤에 언마운트
  setTimeout(() => {
    if (toast.$elements.toasts !== 0) {
      const toastElements = toast.$elements.toasts
      Array.from(toastElements).forEach(toast => toast.remove())
    } else {
      console.error('❌ this.$target가 존재하지 않음!')
    }
  }, 2000)
}
