package community.vaniila.domain.user.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class ModifyRequest {

  @NotNull
  private String nickname;

  @NotNull
  private String imageUrl;
}
