package com.example.estaterent.controller;

import com.example.estaterent.model.Record;
import com.example.estaterent.repository.RecordRepository;
import com.example.estaterent.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class RecordController {

    private RecordService recordService;

    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @GetMapping("/records")
    List<Record> getRecords(){
        return this.recordService.getRecords();
    }

    @DeleteMapping("/records/{id}")
    ResponseEntity<?> deleteRecord(@PathVariable Long id){
        return this.recordService.deleteRecord(id);
    }

    @GetMapping("/records/{id}")
    ResponseEntity<?> getRecord(@PathVariable Long id){
        return this.recordService.getRecord(id);
    }

    @PostMapping("/records")
    ResponseEntity<Record> createRecord(@Valid @RequestBody Record record) throws URISyntaxException {
        return this.recordService.createRecord(record);
    }

    @PutMapping("/records/{id}")
    ResponseEntity<Record> updateRecord(@Valid @RequestBody Record record){
        return this.recordService.updateRecord(record);
    }

}
