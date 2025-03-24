package community.vaniila.domain.post.dto.response.comment;

import java.time.LocalDateTime;

public class CommentCreateResponse {
  private Long commentId;
  private Long userId;
  private String imageUrl;
  private String content;
  private LocalDateTime createdAt;

  public CommentCreateResponse(Long commentId, Long userId, String imageUrl, String content, LocalDateTime createdAt) {
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
