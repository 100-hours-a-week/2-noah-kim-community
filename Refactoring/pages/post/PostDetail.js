import Component from "../../components/common/Component.js";
class PostDetail extends Component {
  setup() {
    this.loadStyles();
  }
  loadStyles() {
    // super.loadStyles("/styles/post/postlist.css");
  }

  template() {
    return `PostDetail`;
  }

  setEvent() {}
}

export default PostDetail;
