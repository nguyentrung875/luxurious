package com.java06.luxurious_hotel.service;

import com.java06.luxurious_hotel.request.AddBookingRequest;
import com.java06.luxurious_hotel.request.UpdateBookingRequest;
import org.springframework.stereotype.Service;

@Service
public interface BookingService {
    void addNewBooking(AddBookingRequest request);
    void editBooking(UpdateBookingRequest request);
    boolean deleteBooking(int idBooking);
}
