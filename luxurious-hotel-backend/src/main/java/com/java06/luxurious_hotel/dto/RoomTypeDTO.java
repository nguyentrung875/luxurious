package com.java06.luxurious_hotel.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoomTypeDTO {

    private int id;
    private String name;
    private String overview;
    private double price;
    private double area;
    private int capacity;
    private String bedName;
    private List<String> roomName;
    private List<String> image;
    private String amenity;

    private List<String> roomNo; //Trung dùng

}