package community.vaniila.domain.post.dto.response.comment;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentCreateResponse {
  private Long commentId;
  private Long userId;
  private String nickname;
  private String imageUrl;
  private String content;
  private LocalDateTime createdAt;
}
