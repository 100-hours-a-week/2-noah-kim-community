package community.vaniila.domain.post.dto.request.comment;

public class CommentUpdateRequest {
  private String content;

  public String getContent() {
    return content;
  }

  public boolean isInvalid() {
    return content == null || content.isBlank();
  }
}