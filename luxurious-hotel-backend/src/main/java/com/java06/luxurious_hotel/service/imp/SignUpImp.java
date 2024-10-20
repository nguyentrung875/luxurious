package com.java06.luxurious_hotel.service.imp;

import com.java06.luxurious_hotel.entity.UserEntity;
import com.java06.luxurious_hotel.repository.UserRepository;
import com.java06.luxurious_hotel.request.SignUpRequest;
import com.java06.luxurious_hotel.service.SignUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignUpImp implements SignUpService {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
   private UserRepository userRepository;

    @Override
    public void signUp(SignUpRequest signUpRequest) {
        String check= signUpRequest.rePassword();
        UserEntity user = new UserEntity();
        user.setUsername(signUpRequest.username());
        user.setEmail(signUpRequest.email());
        user.setDeleted(0);
        if(signUpRequest.password().equals(check)){
            user.setPassword(passwordEncoder.encode(signUpRequest.password()));
            userRepository.save(user);

        }
    }
}
