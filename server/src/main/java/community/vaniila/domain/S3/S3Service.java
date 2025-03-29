package community.vaniila.domain.S3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.util.IOUtils;
import community.vaniila.domain.S3.request.ImageDeleteRequest;
import community.vaniila.domain.S3.response.ImageUploadResponse;
import community.vaniila.domain.utils.response.CustomException;
import community.vaniila.domain.utils.response.errorcode.S3ErrorCode;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;


@Slf4j
@RequiredArgsConstructor
@Component
public class S3Service {

  private final AmazonS3 amazonS3;

  @Value("${cloud.aws.s3.bucketName}")
  private String bucketName;

  /** S3에 저장된 이미지 객체의 public url을 반환한다 */
  public ImageUploadResponse uploadImage(MultipartFile image) {
    if(image.isEmpty() || Objects.isNull(image.getOriginalFilename())){
      throw new CustomException(S3ErrorCode.EMPTY_FILE_EXCEPTION);
    }

    String uploadedUrl = this.upload(image);
    return new ImageUploadResponse(uploadedUrl);
  }

  /** 이미지를 S3에 업로드한다 */
  private String upload(MultipartFile image) {
    this.validateImageFileExtention(image.getOriginalFilename());
    try {
      return this.uploadImageToS3(image);
    } catch (IOException e) {
      throw new CustomException(S3ErrorCode.IO_EXCEPTION_ON_IMAGE_UPLOAD);
    }
  }

  /** 확장자 명이 올바른지 확인하는 메소드 */
  private void validateImageFileExtention(String filename) {
    int lastDotIndex = filename.lastIndexOf(".");
    if (lastDotIndex == -1) {
      throw new CustomException(S3ErrorCode.NO_FILE_EXTENSION);
    }

    String extention = filename.substring(lastDotIndex + 1).toLowerCase();
    List<String> allowedExtentionList = Arrays.asList("jpg", "jpeg", "png", "gif");

    if (!allowedExtentionList.contains(extention)) {
      throw new CustomException(S3ErrorCode.INVALID_FILE_EXTENSION);
    }
  }

  /** 실제 이미지 업로드 메서드 */
  private String uploadImageToS3(MultipartFile image) throws IOException {
    String originalFilename = image.getOriginalFilename(); //원본 파일 명
    String extention = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);

    String s3FileName = UUID.randomUUID().toString().substring(0, 10) + originalFilename; //변경된 파일 명

    InputStream is = image.getInputStream();
    byte[] bytes = IOUtils.toByteArray(is);

    ObjectMetadata metadata = new ObjectMetadata();
    metadata.setContentType("image/" + extention.toLowerCase());
    metadata.setContentLength(bytes.length);
    ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);

    try{
      PutObjectRequest putObjectRequest =
          new PutObjectRequest(bucketName, s3FileName, byteArrayInputStream, metadata);
      amazonS3.putObject(putObjectRequest); // put image to S3
    }catch (Exception e){
      log.error("S3 이미지 업로드 실패", e); // 추가
      throw new CustomException(S3ErrorCode.PUT_OBJECT_EXCEPTION);
    }finally {
      byteArrayInputStream.close();
      is.close();
    }

    return amazonS3.getUrl(bucketName, s3FileName).toString();
  }

  /** 이미지의 public url을 이용하여 S3에서 해당 이미지를 제거하는 메서드 */
  public void deleteImage(ImageDeleteRequest request){
    String imageUrl = request.getImageUrl();

    String key = getKeyFromImageAddress(imageUrl);
    try{
      amazonS3.deleteObject(new DeleteObjectRequest(bucketName, key));
    }catch (Exception e){
      throw new CustomException(S3ErrorCode.IO_EXCEPTION_ON_IMAGE_DELETE);
    }
  }

  private String getKeyFromImageAddress(String imageAddress){
    try{
      URL url = new URL(imageAddress);
      String decodingKey = URLDecoder.decode(url.getPath(), "UTF-8");
      return decodingKey.substring(1); // 맨 앞의 '/' 제거
    }catch (MalformedURLException | UnsupportedEncodingException e){
      throw new CustomException(S3ErrorCode.IO_EXCEPTION_ON_IMAGE_DELETE);
    }
  }
}
