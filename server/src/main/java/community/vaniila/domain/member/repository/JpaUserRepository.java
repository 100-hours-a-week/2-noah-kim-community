package community.vaniila.domain.member.repository;

import community.vaniila.domain.member.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaUserRepository extends JpaRepository<User, Long>, UserRepository {

}
