package community.vaniila.domain.user.controller;

import community.vaniila.domain.user.dto.request.LoginRequest;
import community.vaniila.domain.user.dto.request.ModifyRequest;
import community.vaniila.domain.user.dto.request.RegisterRequest;
import community.vaniila.domain.user.dto.response.LoginResponse;
import community.vaniila.domain.user.service.UserService;
import community.vaniila.domain.utils.response.CommonResponse;
import community.vaniila.domain.utils.security.JwtUtils;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class UserController {

  private final UserService userService;
  private final JwtUtils jwtUtils;

  @PostMapping("/register")
  public ResponseEntity<Void> registerUser(@RequestBody @Valid RegisterRequest request) {
      userService.registerUser(request.getEmail(), request.getPassword(), request.getNickname(), request.getImageUrl());

      return ResponseEntity.noContent().build();
  }

  @PostMapping("/login")
  public ResponseEntity<CommonResponse<LoginResponse>> loginUser(@RequestBody @Valid LoginRequest request) {
    LoginResponse response = userService.loginUser(request);

    return ResponseEntity.ok()
        .header("Authorization", "Bearer " + response.getAccessToken())
        .body(CommonResponse.success("login success", response));
  }

  @PostMapping("/modify")
  public ResponseEntity<Void> modifyUserInfo(
      @RequestHeader("Authorization") String authHeader,
      @RequestBody @Valid ModifyRequest request
  ) {
    // "Bearer {token}"에서 token만 추출
    String token = authHeader.replace("Bearer ", "").trim();

    // 토큰에서 userId 추출
    Long userId = jwtUtils.getId(token);  // ← 직접 만든 메서드

    userService.modifyUser(userId, request.getNickname(), request.getImageUrl());

    return ResponseEntity.noContent().build();  // 204 No Content
  }

  @DeleteMapping("/unregister")
  public ResponseEntity<Void> unregister(
      @RequestHeader("Authorization") String authHeader
  ) {
    String token = authHeader.replace("Bearer ", "").trim();
    Long userId = jwtUtils.getId(token);

    userService.unregisterUser(userId);

    return ResponseEntity.noContent().build(); // 204 No Content
  }
}
