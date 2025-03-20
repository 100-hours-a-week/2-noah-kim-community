package community.vaniila.domain.member.service;

import community.vaniila.domain.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

  private final MemberRepository memberRepository;

  //  @Autowired
  public MemberService(MemberRepository memberRepository) {
    this.memberRepository = memberRepository;
  }
}
