package community.vaniila.domain.post.dto.request.post;

import lombok.Getter;

@Getter
public class PostCreateRequest {
  private String title;
  private String content;
  private String imageUrl;

  /**  */
  public boolean isInvalid() {
    return title == null || content == null || imageUrl == null ||
        title.isBlank() || content.isBlank() || imageUrl.isBlank();
  }
}