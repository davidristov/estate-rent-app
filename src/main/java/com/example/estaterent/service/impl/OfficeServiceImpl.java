package com.example.estaterent.service.impl;

import com.example.estaterent.model.Office;
import com.example.estaterent.repository.OfficeRepository;
import com.example.estaterent.service.OfficeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfficeServiceImpl implements OfficeService {

    private OfficeRepository officeRepository;

    public OfficeServiceImpl(OfficeRepository officeRepository) {
        this.officeRepository = officeRepository;
    }

    @Override
    public List<Office> getOffices(){
        return this.officeRepository.findAll();
    }

}
