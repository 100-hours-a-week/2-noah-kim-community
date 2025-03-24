package community.vaniila.domain.post.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
public class Post {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "user_id", nullable = false)
  private Long userId;

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

  protected Post() {}

  public Post(Long userId, String title, String content, String thumbnailUrl) {
    this.userId = userId;
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

  public Long getUserId() {
    return userId;
  }


}