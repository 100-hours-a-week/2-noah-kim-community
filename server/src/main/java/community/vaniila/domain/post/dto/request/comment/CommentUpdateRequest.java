package community.vaniila.domain.post.dto.request.comment;

import lombok.Getter;

@Getter
public class CommentUpdateRequest {
  private String content;

  public boolean isInvalid() {
    return content == null || content.isBlank();
  }
}