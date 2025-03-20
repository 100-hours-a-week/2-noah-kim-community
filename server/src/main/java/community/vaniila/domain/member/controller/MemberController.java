package community.vaniila.domain.member.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;

public class MemberController {
  @PostMapping("/auth/profile/image")
  public String uploadProfileImage() {
    return "TODO";
  }

  @PostMapping("/auth/register")
  public String register() {
    return "TODO";
  }

  @PostMapping("/auth/login")
  public String login() {
    return "TODO";
  }

  @PatchMapping("/auth/modify")
  public String modifyProfile() {
    return "TODO";
  }

  @DeleteMapping("/auth/unregister")
  public String unregister() {
    return "TODO";
  }

}
