package community.vaniila.domain.post.service;


import community.vaniila.domain.post.dto.request.comment.CommentCreateRequest;
import community.vaniila.domain.post.dto.response.comment.CommentCreateResponse;
import community.vaniila.domain.post.dto.response.comment.CommentErrorCode;
import community.vaniila.domain.post.dto.response.post.PostErrorCode;
import community.vaniila.domain.post.entity.Comment;
import community.vaniila.domain.post.entity.Post;
import community.vaniila.domain.post.repository.CommentRepository;
import community.vaniila.domain.post.repository.PostRepository;
import community.vaniila.domain.user.dto.response.AuthErrorCode;
import community.vaniila.domain.user.entity.User;
import community.vaniila.domain.user.repository.UserRepository;
import community.vaniila.domain.utils.response.CustomException;
import community.vaniila.domain.utils.security.JwtProperties;
import community.vaniila.domain.utils.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentService {

  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private final CommentRepository commentRepository;
  private final JwtUtils jwtUtils;


  @Autowired
  public CommentService(PostRepository postRepository,UserRepository userRepository, CommentRepository commentRepository, JwtProperties jwtProperties,
      JwtUtils jwtUtils) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
    this.commentRepository = commentRepository;
    this.jwtUtils = jwtUtils;
  }

  @Transactional
  public CommentCreateResponse createComment(Long userId, Long postId, CommentCreateRequest request) {
    if (request.isInvalid()) {
      throw new CustomException(CommentErrorCode.COMMENT_INVALID_DATA);
    }

    User user = userRepository.findById(userId)
        .orElseThrow(() -> new CustomException(AuthErrorCode.AUTH_USER_NOT_FOUND));

    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new CustomException(PostErrorCode.POST_NOT_FOUND));

    Comment comment = new Comment(postId, userId, request.getContent());
    Comment savedComment = commentRepository.save(comment);

    System.out.println("userId: " + user.getId() + ", postId: " + post.getId());

    return new CommentCreateResponse(
        savedComment.getId(),
        user.getId(),
        user.getImageUrl(),
        savedComment.getContent(),
        savedComment.getCreatedAt()
    );
  }
}

