package community.vaniila.domain.post.dto.response.comment;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentUpdateResponse {
  private Long commentId;
  private String content;
  private LocalDateTime updatedAt;
}