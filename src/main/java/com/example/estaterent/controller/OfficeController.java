package com.example.estaterent.controller;

import com.example.estaterent.model.Office;
import com.example.estaterent.service.OfficeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OfficeController {

    private OfficeService officeService;

    public OfficeController(OfficeService officeService) {
        this.officeService = officeService;
    }

    @GetMapping("/offices")
    List<Office> getOffices(){
        return officeService.getOffices();
    }



}
