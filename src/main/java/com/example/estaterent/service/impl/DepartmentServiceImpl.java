package com.example.estaterent.service.impl;

import com.example.estaterent.model.Department;
import com.example.estaterent.repository.DepartmentRepository;
import com.example.estaterent.service.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private DepartmentRepository departmentRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public List<Department> getDepartments(){
        return departmentRepository.findAll();
    }

}
