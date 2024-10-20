package com.java06.luxurious_hotel.service;

import com.java06.luxurious_hotel.request.SignUpRequest;
import org.springframework.stereotype.Service;

@Service
public interface SignUpService {
    void signUp(SignUpRequest signUpRequest);
}
