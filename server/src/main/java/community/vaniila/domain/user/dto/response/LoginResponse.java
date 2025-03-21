package community.vaniila.domain.user.dto.response;

public class LoginResponse {

  Long userId;
  String accessToken;

  public LoginResponse(Long userId, String accessToken) {
    this.userId = userId;
    this.accessToken = accessToken;
  }

  public Long getUserId() {
    return userId;
  }
  public String getAccessToken() {
    return accessToken;
  }
}
