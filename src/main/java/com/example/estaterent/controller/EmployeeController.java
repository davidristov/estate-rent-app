package com.example.estaterent.controller;

import com.example.estaterent.model.Employee;
import com.example.estaterent.model.Record;
import com.example.estaterent.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/employees")
    List<Employee> getEmployees(){
        return employeeRepository.findAll();
    }

    @DeleteMapping("/employees/{id}")
    ResponseEntity<?> deleteRecord(@PathVariable Long id){
        employeeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/employees/{id}")
    ResponseEntity<?> getEmployee(@PathVariable Long id){
        Optional<Employee> employee = employeeRepository.findById(id);
        return employee.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/employees")
    ResponseEntity<Employee> addEmployee(@Valid @RequestBody Employee employee) throws URISyntaxException {
        Employee result = employeeRepository.save(employee);
        return ResponseEntity.created(new URI("/api/employees" + result.getId())).body(result);
    }

}
