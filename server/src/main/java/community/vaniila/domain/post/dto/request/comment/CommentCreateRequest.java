package community.vaniila.domain.post.dto.request.comment;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class CommentCreateRequest {
  @NotNull
  private String content;
}
