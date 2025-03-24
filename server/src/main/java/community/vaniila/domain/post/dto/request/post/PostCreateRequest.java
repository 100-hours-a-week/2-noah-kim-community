package community.vaniila.domain.post.dto.request.post;

public class PostCreateRequest {

  private String title;
  private String content;
  private String imageUrl;

  public String getTitle() {
    return title;
  }

  public String getContent() {
    return content;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  /**  */
  public boolean isInvalid() {
    return title == null || content == null || imageUrl == null ||
        title.isBlank() || content.isBlank() || imageUrl.isBlank();
  }
}