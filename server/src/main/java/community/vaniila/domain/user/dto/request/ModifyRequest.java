package community.vaniila.domain.user.dto.request;

import lombok.Getter;

@Getter
public class ModifyRequest {
  private String nickname;
  private String imageUrl;
}
