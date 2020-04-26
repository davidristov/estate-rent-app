package com.example.estaterent.service.impl;

import com.example.estaterent.model.Employee;
import com.example.estaterent.repository.EmployeeRepository;
import com.example.estaterent.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public ResponseEntity<?> deleteRecord(Long id) {
        employeeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<?> getEmployee(Long id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        return employee.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<Employee> addEmployee(Employee employee) throws URISyntaxException {
        Employee result = employeeRepository.save(employee);
        return ResponseEntity.created(new URI("/api/employees" + result.getId())).body(result);
    }

    @Override
    public ResponseEntity<Employee> updateEmployee(Employee employee) {
        Employee result = employeeRepository.save(employee);
        return ResponseEntity.ok().body(result);
    }
}
