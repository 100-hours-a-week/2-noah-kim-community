package community.vaniila.domain.post.repository;

import community.vaniila.domain.post.entity.Post;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
  List<Post> findByUserIdAndDeletedAtIsNull(Long userId);
  Page<Post> findByDeletedAtIsNullAndUser_DeletedAtIsNull(Pageable pageable);
}