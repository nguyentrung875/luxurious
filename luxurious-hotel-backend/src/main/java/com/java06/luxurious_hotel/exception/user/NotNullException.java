package com.java06.luxurious_hotel.exception.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NotNullException extends RuntimeException {

    private String message;

}
