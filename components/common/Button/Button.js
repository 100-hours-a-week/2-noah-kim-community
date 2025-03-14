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

  mounted() {
    // DOM 요소 저장
    // this.$elements = {
    //   button: 소ㅑㄴ,
    // }
    // console.log(this.$elements.button)
  }

  setEvent() {
    const { onClick } = this.$props

    /** 클릭 이벤트 전달 */
    this.addEvent('click', this.$target, onClick)
  }
}

export default Button
