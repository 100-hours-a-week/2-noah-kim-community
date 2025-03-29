package community.vaniila.domain.S3;

import community.vaniila.domain.S3.request.ImageDeleteRequest;
import community.vaniila.domain.S3.response.ImageUploadResponse;
import community.vaniila.domain.utils.response.CommonResponse;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/s3")
@AllArgsConstructor(access = AccessLevel.PACKAGE)
public class S3Controller {

  private final S3Service s3Service;

  /** 이미지 업로드  삭제 */
  @PostMapping("/image")
  public ResponseEntity<CommonResponse<ImageUploadResponse>> s3Upload(@RequestParam("image") MultipartFile image){
    ImageUploadResponse response = s3Service.uploadImage(image);
    return ResponseEntity.ok(CommonResponse.success("이미지 업로드 완료", response));
  }

  /** 이미지 삭제 */
  @DeleteMapping("/image")
  public ResponseEntity<Void> s3delete(@RequestBody @Valid ImageDeleteRequest request){

    s3Service.deleteImage(request);
    return ResponseEntity.noContent().build();
  }


}
