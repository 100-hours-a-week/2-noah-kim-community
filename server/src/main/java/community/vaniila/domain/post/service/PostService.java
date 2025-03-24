package community.vaniila.domain.post.service;

import community.vaniila.domain.post.dto.request.PostCreateRequest;
import community.vaniila.domain.post.dto.request.PostModifyRequest;
import community.vaniila.domain.post.dto.response.PostErrorCode;
import community.vaniila.domain.post.entity.Post;
import community.vaniila.domain.post.repository.PostRepository;
import community.vaniila.domain.utils.security.JwtProperties;
import community.vaniila.domain.utils.security.JwtUtils;
import community.vaniila.domain.utils.response.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PostService {

  private final PostRepository postRepository;
  private final JwtUtils jwtUtils;


  @Autowired
  public PostService(PostRepository postRepository, JwtProperties jwtProperties,
      JwtUtils jwtUtils) {
    this.postRepository = postRepository;
    this.jwtUtils = jwtUtils;
  }

  /** 게시글 생성 */
  @Transactional
  public void createPost(Long userId, PostCreateRequest request) {
    if (request.isInvalid()) {
      throw new CustomException(PostErrorCode.POST_INVALID_DATA);
    }

    Post post = new Post(userId, request.getTitle(), request.getContent(), request.getImageUrl());
    postRepository.save(post);
  }

  /** 게시글 수정 */
  @Transactional
  public void updatePost(Long userId, Long postId, PostModifyRequest request) {
    if (request.isInvalid()) {
      throw new CustomException(PostErrorCode.POST_INVALID_DATA);
    }

    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new CustomException(PostErrorCode.POST_NOT_FOUND));

    if (!post.getUserId().equals(userId)) {
      throw new CustomException(PostErrorCode.POST_UNAUTHORIZED);
    }

    post.modify(request.getTitle(), request.getContent(), request.getImageUrl());
  }
}

