package com.java06.luxurious_hotel.repository;

import com.java06.luxurious_hotel.entity.UserEntity;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    @Modifying
    @Query(value = "UPDATE users u SET u.delete = 1 WHERE u.id = ?1", nativeQuery = true)
    void resetDeleteStatus(int userId);

    List<UserEntity> findByRole_Name(String roleName);
    List<UserEntity> findUserEntityById(int id);
    Optional<UserEntity> findUserEntityByPhone(String phone);

    UserEntity findById(int id);

    Optional<UserEntity> findByUsername(String username);

    UserEntity findUserEntityByEmail(String email);

    UserEntity findByPhone(String phone);


}
