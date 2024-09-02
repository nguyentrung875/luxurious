package com.java06.luxurious_hotel.service;


import com.java06.luxurious_hotel.dto.RoomVailableDTO;
import com.java06.luxurious_hotel.request.SearchRoomRequest;

import java.util.List;

public interface RoomService {

    List<RoomVailableDTO> getAvailableRooms(SearchRoomRequest searchRoomRequest);

import com.java06.luxurious_hotel.dto.RoomTypeByDateDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public interface RoomService {
    List<RoomTypeByDateDTO> getRoomInfoByDate(String chooseDate);

}