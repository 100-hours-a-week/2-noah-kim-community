package community.vaniila.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserDataResponse {
  private Long userId;
  private String email;
  private String nickname;
  private String imageUrl;
}
