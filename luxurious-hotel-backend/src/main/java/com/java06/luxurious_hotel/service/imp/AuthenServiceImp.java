package com.java06.luxurious_hotel.service.imp;

import com.java06.luxurious_hotel.dto.AuthorityDTO;
import com.java06.luxurious_hotel.entity.InvalidTokenEntity;
import com.java06.luxurious_hotel.exception.authen.TokenInvalidException;
import com.java06.luxurious_hotel.repository.InvalidTokenRepository;
import com.java06.luxurious_hotel.request.AuthenRequest;
import com.java06.luxurious_hotel.service.AuthenService;
import com.java06.luxurious_hotel.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
public class AuthenServiceImp implements AuthenService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private InvalidTokenRepository invalidTokenRepository;

    @Override
    public String login(AuthenRequest request) {

        UsernamePasswordAuthenticationToken authenToken =
                new UsernamePasswordAuthenticationToken(request.username(), request.password());
        Authentication authen = authenticationManager.authenticate(authenToken);



        String role = authen.getAuthorities()
                .stream().map(grantedAuthority -> grantedAuthority.getAuthority().toString()
                ).findFirst().get();

//        AuthorityDTO authorityDTO1 = (AuthorityDTO) authen.getPrincipal();
//        System.out.println(authorityDTO1);

        AuthorityDTO authorityDTO = new AuthorityDTO();
        authorityDTO.setUsername(request.username());
        authorityDTO.setRole(role);

        return jwtUtils.generateJwtToken(authorityDTO);
    }

    @Override
    public boolean logout(String headerToken) {

        String token = jwtUtils.getTokenFromHeader(headerToken);
        if (token == null) return false;

        Jws<Claims> claims = jwtUtils.getClaims(token);
        InvalidTokenEntity invalidTokenEntity = new InvalidTokenEntity();
        invalidTokenEntity.setToken(token);
        invalidTokenEntity.setExpTime(claims.getPayload().getExpiration().toInstant()
                .atZone(ZoneId.of("UTC"))
                .toLocalDateTime());

        invalidTokenRepository.save(invalidTokenEntity);

        return true;
    }
}
