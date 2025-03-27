package community.vaniila.domain.post.dto.request.post;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class PostModifyRequest {
  @NotNull
  private String title;

  @NotNull
  private String content;

  @NotNull
  private String imageUrl;
}