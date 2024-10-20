package com.java06.luxurious_hotel.request;

public record SignUpRequest(String username,
                            String email,
                            String password,
                            String rePassword) {
}
