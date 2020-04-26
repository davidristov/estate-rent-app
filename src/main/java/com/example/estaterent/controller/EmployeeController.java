package com.example.estaterent.controller;

import com.example.estaterent.model.Employee;
import com.example.estaterent.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.List;


@RestController
@RequestMapping("/api")
public class EmployeeController {

    EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/employees")
    List<Employee> getEmployees(){
        return employeeService.getEmployees();
    }

    @DeleteMapping("/employees/{id}")
    ResponseEntity<?> deleteRecord(@PathVariable Long id){
        return employeeService.deleteRecord(id);
    }

    @GetMapping("/employees/{id}")
    ResponseEntity<?> getEmployee(@PathVariable Long id){
        return employeeService.getEmployee(id);
    }

    @PostMapping("/employees")
    ResponseEntity<Employee> addEmployee(@Valid @RequestBody Employee employee) throws URISyntaxException {
        return employeeService.addEmployee(employee);
    }

    @PutMapping("/employees/{id}")
    ResponseEntity<Employee> updateEmployee(@Valid @RequestBody Employee employee){
        return employeeService.updateEmployee(employee);
    }

}
