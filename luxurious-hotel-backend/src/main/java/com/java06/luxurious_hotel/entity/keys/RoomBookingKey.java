package com.java06.luxurious_hotel.entity.keys;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Data
@Embeddable
public class RoomBookingKey implements Serializable {

    @Column(name = "id_room")
    private int idRoom;

    @Column(name = "id_booking")
    private int idBooking;

}
