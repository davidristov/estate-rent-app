package com.example.estaterent.controller;

import com.example.estaterent.model.Record;
import com.example.estaterent.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RecordController {

    @Autowired
    private RecordRepository recordRepository;

    @GetMapping("/records")
    List<Record> getRecords(){
        return recordRepository.findAll();
    }

    @DeleteMapping("/records/{id}")
    ResponseEntity<?> deleteRecord(@PathVariable Long id){
        recordRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/records")
    ResponseEntity<Record> createRecord(@Valid @RequestBody Record record) throws URISyntaxException {
        Record result = recordRepository.save(record);
        return ResponseEntity.created(new URI("/api/records" + result.getId())).body(result);
    }

}
