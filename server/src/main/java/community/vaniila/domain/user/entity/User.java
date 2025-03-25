package community.vaniila.domain.user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true, length = 254)
  private String email;

  @Column(nullable = false, length = 128)
  private String password;

  @Column(name = "image_url", nullable = false, length = 255)
  private String imageUrl;

  @Column(nullable = false,unique = true, length = 31)
  private String nickname;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt = LocalDateTime.now();

  @Column(name = "deleted_at")
  private LocalDateTime deletedAt;


  public User(String email, String password, String image_url, String nickname) {
    this.email = email;
    this.password = password;
    this.imageUrl = image_url;
    this.nickname = nickname;
  }

  public void updateInfo(String nickname, String imageUrl) {
    this.nickname = nickname;
    this.imageUrl = imageUrl;
    this.updatedAt = LocalDateTime.now();  // 수정일 갱신
  }
}