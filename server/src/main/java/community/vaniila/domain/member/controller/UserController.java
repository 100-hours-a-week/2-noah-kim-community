package community.vaniila.domain.member.controller;

import community.vaniila.domain.member.entity.User;
import community.vaniila.domain.member.service.UserService;
import community.vaniila.domain.utils.response.CommonResponse;
import community.vaniila.domain.utils.response.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
  public ResponseEntity<CommonResponse<String>> registerUser(@RequestBody User user) {
      userService.registerMember(user.getEmail(), user.getPassword(), user.getNickname(), user.getImageUrl());
      return ResponseEntity.ok(CommonResponse.success("user register success", null));
  }
}
