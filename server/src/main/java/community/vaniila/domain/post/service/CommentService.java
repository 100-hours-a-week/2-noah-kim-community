package community.vaniila.domain.post.service;


import community.vaniila.domain.post.dto.request.comment.CommentCreateRequest;
import community.vaniila.domain.post.dto.request.comment.CommentUpdateRequest;
import community.vaniila.domain.post.dto.response.comment.CommentCreateResponse;
import community.vaniila.domain.post.dto.response.comment.CommentUpdateResponse;
import community.vaniila.domain.post.entity.Comment;
import community.vaniila.domain.post.entity.Post;
import community.vaniila.domain.post.repository.CommentRepository;
import community.vaniila.domain.post.repository.PostRepository;
import community.vaniila.domain.user.entity.User;
import community.vaniila.domain.user.repository.UserRepository;
import community.vaniila.domain.utils.response.CustomException;
import community.vaniila.domain.utils.response.errorcode.AuthErrorCode;
import community.vaniila.domain.utils.response.errorcode.CommentErrorCode;
import community.vaniila.domain.utils.response.errorcode.PostErrorCode;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor(onConstructor_ = {@Autowired})
public class CommentService {

  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private final CommentRepository commentRepository;


  /** 댓글 생성 */
  @Transactional
  public CommentCreateResponse createComment(Long userId, Long postId, CommentCreateRequest request) {

    User user = userRepository.findById(userId)
        .orElseThrow(() -> new CustomException(AuthErrorCode.AUTH_USER_NOT_FOUND));

    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new CustomException(PostErrorCode.POST_NOT_FOUND));

    Comment comment = new Comment(post, user, request.getContent());
    Comment savedComment = commentRepository.save(comment);

    return new CommentCreateResponse(
        savedComment.getId(),
        user.getId(),
        user.getImageUrl(),
        savedComment.getContent(),
        savedComment.getCreatedAt()
    );
  }

  /** 댓글 수정 */
  @Transactional
  public CommentUpdateResponse updateComment(Long userId, Long postId, Long commentId, CommentUpdateRequest request) {
    Comment comment = commentRepository.findById(commentId)
        .orElseThrow(() -> new CustomException(CommentErrorCode.COMMENT_NOT_FOUND));

    if (!comment.getUser().getId().equals(userId) || !comment.getPost().getId().equals(postId)) {
      throw new CustomException(CommentErrorCode.COMMENT_UNAUTHORIZED);
    }

    comment.update(request.getContent());

    return new CommentUpdateResponse(
        comment.getId(),
        comment.getContent(),
        comment.getUpdatedAt()
    );
  }


  /** 댓글 삭제 */
  @Transactional
  public void deleteComment(Long userId, Long postId, Long commentId) {
    Comment comment = commentRepository.findById(commentId)
        .orElseThrow(() -> new CustomException(CommentErrorCode.COMMENT_NOT_FOUND));

    if (!comment.getUser().getId().equals(userId) || !comment.getPost().getId().equals(postId)) {
      throw new CustomException(CommentErrorCode.COMMENT_UNAUTHORIZED);
    }
    if (comment.getDeletedAt() != null) {
      throw new CustomException(CommentErrorCode.COMMENT_DELETED);
    }

    comment.softDelete(); // deleted_at 갱신
  }
}

