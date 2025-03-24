package community.vaniila.domain.post.dto.response.post;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostDetailResponse {

  private PostData postData;
  private UserData userData;

  @Getter
  @AllArgsConstructor
  public static class PostData {
    private Long postId;
    private String title;
    private String content;
    private String imageUrl;
    private int likeCount;
    private int viewCount;
    private List<CommentData> comments;
    private LocalDateTime createdAt;
  }

  @Getter
  @AllArgsConstructor
  public static class CommentData {
    private Long commentId;
    private Long userId;
    private String imageUrl;
    private String content;
    private LocalDateTime createdAt;
  }

  @Getter
  @AllArgsConstructor
  public static class UserData {
    private Long userId;
    private String name;
    private String imageUrl;
  }
}