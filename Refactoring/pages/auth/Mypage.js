import Component from "../../components/common/Component.js";
class Mypage extends Component {
  setup() {
    this.loadStyles();
  }
  loadStyles() {
    // super.loadStyles("/styles/post/postlist.css");
  }

  template() {
    return `Mypage`;
  }

  setEvent() {}
}

export default Mypage;
