package community.vaniila.domain.user.dto.request;


import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class PasswordModifyRequest {

  @NotNull
  private String password;
}

