package community.vaniila.domain.user.dto.response;

import lombok.Getter;

@Getter
public class CreateResponse {

  Long postId;

  public CreateResponse(Long postId) {
    this.postId = postId;
  }
}