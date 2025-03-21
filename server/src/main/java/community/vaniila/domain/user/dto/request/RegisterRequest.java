package community.vaniila.domain.user.dto.request;

public class RegisterRequest {

  String email;
  String password;
  String nickname;
  String imageUrl;

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
