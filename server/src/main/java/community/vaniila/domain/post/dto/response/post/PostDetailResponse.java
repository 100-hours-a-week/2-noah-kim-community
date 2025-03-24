package community.vaniila.domain.post.dto.response.post;

import java.time.LocalDateTime;
import java.util.List;

public class PostDetailResponse {

  private PostData postData;
  private UserData userData;

  public PostDetailResponse(PostData postData, UserData userData) {
    this.postData = postData;
    this.userData = userData;
  }

  public static class PostData {
    private Long postId;
    private String title;
    private String content;
    private String imageUrl;
    private int likeCount;
    private int viewCount;
    private List<CommentData> comments;
    private LocalDateTime createdAt;

    public PostData(Long postId, String title, String content, String imageUrl, int likeCount, int viewCount,
        List<CommentData> comments, LocalDateTime createdAt) {
      this.postId = postId;
      this.title = title;
      this.content = content;
      this.imageUrl = imageUrl;
      this.likeCount = likeCount;
      this.viewCount = viewCount;
      this.comments = comments;
      this.createdAt = createdAt;
    }

    public Long getPostId() {
      return postId;
    }

    public String getTitle() {
      return title;
    }

    public String getContent() {
      return content;
    }

    public String getImageUrl() {
      return imageUrl;
    }

    public int getLikeCount() {
      return likeCount;
    }

    public int getViewCount() {
      return viewCount;
    }

    public List<CommentData> getComments() {
      return comments;
    }

    public LocalDateTime getCreatedAt() {
      return createdAt;
    }
  }

  public static class CommentData {
    private Long commentId;
    private Long userId;
    private String imageUrl;
    private String content;
    private LocalDateTime createdAt;

    public CommentData(Long commentId, Long userId, String imageUrl, String content, LocalDateTime createdAt) {
      this.commentId = commentId;
      this.userId = userId;
      this.imageUrl = imageUrl;
      this.content = content;
      this.createdAt = createdAt;
    }

    public Long getCommentId() {
      return commentId;
    }

    public Long getUserId() {
      return userId;
    }

    public String getImageUrl() {
      return imageUrl;
    }

    public String getContent() {
      return content;
    }

    public LocalDateTime getCreatedAt() {
      return createdAt;
    }
  }

  public static class UserData {
    private Long userId;
    private String name;
    private String imageUrl;

    public UserData(Long userId, String name, String imageUrl) {
      this.userId = userId;
      this.name = name;
      this.imageUrl = imageUrl;
    }

    public Long getUserId() {
      return userId;
    }

    public String getName() {
      return name;
    }

    public String getImageUrl() {
      return imageUrl;
    }
  }

  public PostData getPostData() {
    return postData;
  }

  public UserData getUserData() {
    return userData;
  }
}