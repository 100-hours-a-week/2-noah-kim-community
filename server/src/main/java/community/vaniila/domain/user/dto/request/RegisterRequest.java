package community.vaniila.domain.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class RegisterRequest {
  @NotBlank
  private String email;

  @NotBlank
  private String password;

  @NotBlank
  private String nickname;

  @NotBlank
  private String imageUrl;
}
