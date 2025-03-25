package community.vaniila.domain.user.dto.response;

import lombok.Getter;

@Getter
public class RegisterResponse {
  Long userId;
  String accessToken;
}
