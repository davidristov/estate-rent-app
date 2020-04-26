package com.example.estaterent.service;

import com.example.estaterent.model.Record;
import org.springframework.http.ResponseEntity;

import java.net.URISyntaxException;
import java.util.List;

public interface RecordService {

    ResponseEntity<?> getRecord(Long id);
    List<Record> getRecords();
    ResponseEntity<?> deleteRecord(Long id);
    ResponseEntity<Record> createRecord(Record record) throws URISyntaxException;
    ResponseEntity<Record> updateRecord(Record record);

}
