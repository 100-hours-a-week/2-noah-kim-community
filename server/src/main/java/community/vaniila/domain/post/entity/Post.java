package community.vaniila.domain.post.entity;

import community.vaniila.domain.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "posts")
public class Post {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="user_id")
  private User user;

  @Column(nullable = false, length = 100)
  private String title;

  @Column(nullable = false, columnDefinition = "TEXT")
  private String content;

  @Column(name = "thumbnail_url", length = 255)
  private String thumbnailUrl;

  @Column(name = "like_count", nullable = false)
  private int likeCount = 0;

  @Column(name = "view_count", nullable = false)
  private int viewCount = 0;

  @Column(name = "comment_count", nullable = false)
  private int commentCount = 0;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt = LocalDateTime.now();

  @Column(name = "deleted_at")
  private LocalDateTime deletedAt;

  public Post(User user, String title, String content, String thumbnailUrl) {
    this.user = user;
    this.title = title;
    this.content = content;
    this.thumbnailUrl = thumbnailUrl;
  }

  public void modify(String title, String content, String thumbnailUrl) {
    this.title = title;
    this.content = content;
    this.thumbnailUrl = thumbnailUrl;
    this.updatedAt = LocalDateTime.now();
  }

  public void softDelete() {
    this.deletedAt = LocalDateTime.now();
  }

  public void increaseViewCount() {
    this.viewCount += 1;
  }

  public void increaseCommentCount() {
    this.commentCount += 1;
  }

  public void decreaseCommentCount() {
    this.commentCount -= 1;
  }

}