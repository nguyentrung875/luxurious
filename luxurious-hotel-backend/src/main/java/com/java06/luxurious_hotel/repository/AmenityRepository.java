package com.java06.luxurious_hotel.repository;


import com.java06.luxurious_hotel.entity.AmenityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface AmenityRepository extends JpaRepository<AmenityEntity, Integer> {
}