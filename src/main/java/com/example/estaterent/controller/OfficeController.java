package com.example.estaterent.controller;

import com.example.estaterent.model.Office;
import com.example.estaterent.repository.OfficeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OfficeController {

    @Autowired
    private OfficeRepository officeRepository;

    @GetMapping("/offices")
    List<Office> getOffices(){
        return officeRepository.findAll();
    }



}
