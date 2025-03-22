package community.vaniila.domain.user.dto.response;

public class RegisterResponse {
  Long userId;
  String accessToken;

  public Long getUserId() {
    return userId;
  }
  public String getAccessToken() {
    return accessToken;
  }
}
