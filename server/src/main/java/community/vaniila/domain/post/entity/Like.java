package community.vaniila.domain.post.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "likes", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "post_id"})
})
public class Like {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "user_id", nullable = false)
  private Long userId;

  @Column(name = "post_id", nullable = false)
  private Long postId;

  protected Like() {}

  public Like(Long userId, Long postId) {
    this.userId = userId;
    this.postId = postId;
  }

  public Long getUserId() {
    return userId;
  }

  public Long getPostId() {
    return postId;
  }
}