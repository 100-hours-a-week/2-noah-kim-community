package community.vaniila.domain.post.dto.response.comment;

import java.time.LocalDateTime;

public class CommentUpdateResponse {
  private Long commentId;
  private String content;
  private LocalDateTime updatedAt;

  public CommentUpdateResponse(Long commentId, String content, LocalDateTime updatedAt) {
    this.commentId = commentId;
    this.content = content;
    this.updatedAt = updatedAt;
  }

  public Long getCommentId() {
    return commentId;
  }

  public String getContent() {
    return content;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }
}