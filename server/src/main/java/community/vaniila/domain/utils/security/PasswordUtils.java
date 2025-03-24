package community.vaniila.domain.utils.security;

import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;

public class PasswordUtils {
  private static final int SALT_LENGTH = 16;   // 솔트 길이 (16바이트)
  private static final int HASH_LENGTH = 32;   // 해시 길이 (32바이트)
  private static final int PARALLELISM = 1;    // 병렬 처리 정도
  private static final int MEMORY = 65536;     // 메모리 비용 (64MB)
  private static final int ITERATIONS = 3;     // 반복 횟수

  private static final Argon2PasswordEncoder encoder =
      new Argon2PasswordEncoder(SALT_LENGTH, HASH_LENGTH, PARALLELISM, MEMORY, ITERATIONS);

  public static String hashPassword(String password) {
    return encoder.encode(password);
  }

  public static boolean matches(String rawPassword, String encodedPassword) {
    return encoder.matches(rawPassword, encodedPassword);
  }
}
