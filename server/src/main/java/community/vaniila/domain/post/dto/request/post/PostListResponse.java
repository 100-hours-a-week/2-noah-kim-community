package community.vaniila.domain.post.dto.request.post;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostListResponse {
  private PageInfo page;
  private List<PostSummary> content;

  @Getter
  @AllArgsConstructor
  public static class PageInfo {
    private int totalPages;
    private long totalElements;
  }

  @Getter
  @AllArgsConstructor
  public static class PostSummary {
    private PostData postData;
    private UserData userData;
  }

  @Getter
  @AllArgsConstructor
  public static class PostData {
    private Long postId;
    private String title;
    private String content; // 필요시 제거 가능
    private int likeCount;
    private int viewCount;
    private int commentCount;
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