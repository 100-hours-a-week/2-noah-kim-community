package community.vaniila.domain.utils.password;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.time.Duration;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;


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

  public Long extractUserId(String token) {
    String subject = Jwts.parserBuilder()
        .setSigningKey(key)
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject();

    return Long.parseLong(subject);
  }
}

