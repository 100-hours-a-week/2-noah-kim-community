package community.vaniila.domain.post.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
public class Comment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "post_id", nullable = false)
  private Long postId;

  @Column(name = "user_id", nullable = false)
  private Long userId;

  @Column(nullable = false, columnDefinition = "TEXT")
  private String content;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt = LocalDateTime.now();

  @Column(name = "deleted_at")
  private LocalDateTime deletedAt;

  public Comment() {}
  public Comment(Long postId, Long userId, String content) {
    this.postId = postId;
    this.userId = userId;
    this.content = content;
  }

  public Long getId() {
    return id;
  }
  public Long getPostId() {
    return postId;
  }
  public Long getUserId() {
    return userId;
  }
  public String getContent() {
    return content;
  }
  public LocalDateTime getCreatedAt() {
    return createdAt;
  }
  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }
  public LocalDateTime getDeletedAt() {
    return deletedAt;
  }

  public void update(String content) {
    this.content = content;
    this.updatedAt = LocalDateTime.now();
  }
}