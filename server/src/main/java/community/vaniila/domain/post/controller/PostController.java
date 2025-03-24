package community.vaniila.domain.post.controller;

import community.vaniila.domain.post.dto.request.PostCreateRequest;
import community.vaniila.domain.post.service.PostService;
import community.vaniila.domain.utils.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/post")
public class PostController {

  private final PostService postService;
  private final JwtUtils jwtUtils;

  @Autowired
  public PostController(PostService postService, JwtUtils jwtUtils) {
    this.postService = postService;
    this.jwtUtils = jwtUtils;
  }


  @PostMapping
  public ResponseEntity<Void> createPost(
      @RequestHeader("Authorization") String authHeader,
      @RequestBody PostCreateRequest request
  ) {
    String token = authHeader.replace("Bearer ", "").trim();
    Long userId = jwtUtils.getId(token);

    postService.createPost(userId, request);
    return ResponseEntity.noContent().build();  // 204 No Content
  }


}
