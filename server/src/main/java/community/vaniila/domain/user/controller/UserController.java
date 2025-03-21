package community.vaniila.domain.user.controller;

import community.vaniila.domain.user.dto.request.RegisterRequest;
import community.vaniila.domain.user.entity.User;
import community.vaniila.domain.user.service.UserService;
import community.vaniila.domain.utils.response.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class UserController {

  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/ping")
  public ResponseEntity<String> ping() {
    return ResponseEntity.ok("UserController is working!");
  }

  @PostMapping("/register")
  public ResponseEntity<CommonResponse<String>> registerUser(@RequestBody RegisterRequest request) {
      userService.registerMember(request.getEmail(), request.getPassword(), request.getNickname(), request.getImageUrl());
      return ResponseEntity.ok(CommonResponse.success("user register success", null));
  }
}
