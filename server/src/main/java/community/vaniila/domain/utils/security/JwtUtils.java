package community.vaniila.domain.utils.security;

import community.vaniila.domain.utils.response.CustomException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class JwtUtils {

  private final JwtProperties jwtProperties;
  private final Key key;

  @Autowired
  public JwtUtils(JwtProperties jwtProperties) {
    this.jwtProperties = jwtProperties;
    this.key = Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes());
  }

  public String generateToken(Long userId) {
    return Jwts.builder()
        .setSubject(String.valueOf(userId))
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + jwtProperties.getExpiration()))
        .signWith(key, SignatureAlgorithm.HS256)
        .compact();
  }

  public Long getId(String token) {
    try {
      String subject = Jwts.parserBuilder()
          .setSigningKey(key)
          .build()
          .parseClaimsJws(token)
          .getBody()
          .getSubject();

      return Long.parseLong(subject);

    } catch (ExpiredJwtException e) {
      throw new CustomException(JwtErrorCode.JWT_EXPIRED_TOKEN);  // auth-006
    } catch (JwtException | IllegalArgumentException e) {
      throw new CustomException(JwtErrorCode.JWT_INVALID_TOKEN);  // auth-005
    }
  }
}

