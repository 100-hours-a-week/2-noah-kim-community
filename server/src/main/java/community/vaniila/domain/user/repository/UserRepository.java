package community.vaniila.domain.user.repository;

import community.vaniila.domain.user.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmailAndDeletedAtIsNull(String email);
  boolean existsByEmail(String email);
  boolean existsByNickname(String nickname);
}