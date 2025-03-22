package community.vaniila.domain.user.dto.request;

public class RegisterRequest {

  private String email;
  private String password;
  private String nickname;
  private String imageUrl;

  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }

  public String getNickname() {
    return nickname;
  }

  public String getImageUrl() {
    return imageUrl;
  }
}
