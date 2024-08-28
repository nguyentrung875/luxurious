package com.java06.luxurious_hotel.controller;

import com.java06.luxurious_hotel.request.AddEmployeeRequest;
import com.java06.luxurious_hotel.response.BaseResponse;
import com.java06.luxurious_hotel.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @PutMapping
    public ResponseEntity<?> addEmployee(AddEmployeeRequest addEmployeeRequest) {
        employeeService.addEmployee(addEmployeeRequest);
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setMessage("New Employee Added");
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
}