class Component {
  $target;
  state;

  /** 컴포넌트가 표시될 타겟 지정 */
  constructor($target) {
    this.$target = $target;
    this.setup();
    this.render();
  }
  /** 상태 정의 및 기본값 저장 */
  setup() {}

  /** CSS 불러오기 */
  /** TODO: 스타일 없을때 에러처리 */
  loadStyles(stylePath) {
    if (!stylePath) return;
    const existingLink = document.querySelector(`link[href="${stylePath}"]`);
    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = stylePath;
      document.head.appendChild(link);
    }
  }

  /** HTML 템플릿 저장 */
  template() {
    return "";
  }
  /** 이벤트 달기 */
  setEvent() {}
  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}

export default Component;
