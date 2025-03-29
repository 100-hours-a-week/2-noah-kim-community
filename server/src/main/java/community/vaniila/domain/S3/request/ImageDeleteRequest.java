package community.vaniila.domain.S3.request;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class ImageDeleteRequest {

  @NotBlank
  private String imageUrl;
}
