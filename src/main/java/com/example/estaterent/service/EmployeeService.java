package com.example.estaterent.service;

import com.example.estaterent.model.Employee;
import org.springframework.http.ResponseEntity;

import java.net.URISyntaxException;
import java.util.List;

public interface EmployeeService {
    List<Employee> getEmployees();
    ResponseEntity<?> deleteRecord(Long id);
    ResponseEntity<?> getEmployee(Long id);
    ResponseEntity<Employee> addEmployee(Employee employee) throws URISyntaxException;
    ResponseEntity<Employee> updateEmployee(Employee employee);
}
