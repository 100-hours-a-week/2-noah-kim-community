package community.vaniila.domain.user.dto.response;

import lombok.Getter;

@Getter
public class LoginResponse {

  Long userId;
  String accessToken;

  public LoginResponse(Long userId,String accessToken) {
    this.userId = userId;
    this.accessToken = accessToken;
  }
}
