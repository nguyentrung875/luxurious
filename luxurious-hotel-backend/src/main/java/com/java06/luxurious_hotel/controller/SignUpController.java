package com.java06.luxurious_hotel.controller;

import com.java06.luxurious_hotel.request.SignUpRequest;
import com.java06.luxurious_hotel.response.BaseResponse;
import com.java06.luxurious_hotel.service.SignUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/signup")
public class SignUpController {
    @Autowired
    private SignUpService signUpService;

    @PostMapping
    public ResponseEntity<?> signUp( SignUpRequest signUpRequest) {
        signUpService.signUp(signUpRequest);
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setMessage("New User Added");
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

}
