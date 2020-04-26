package com.example.estaterent.service.impl;

import com.example.estaterent.model.Record;
import com.example.estaterent.repository.RecordRepository;
import com.example.estaterent.service.RecordService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@Service
public class RecordServiceImpl implements RecordService {

    private RecordRepository recordRepository;

    public RecordServiceImpl(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    @Override
    public ResponseEntity<?> getRecord(Long id) {
        Optional<Record> record = recordRepository.findById(id);
        return record.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public List<Record> getRecords() {
        return recordRepository.findAll();
    }

    @Override
    public ResponseEntity<?> deleteRecord(Long id) {
        recordRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<Record> createRecord(Record record) throws URISyntaxException {
        Record result = recordRepository.save(record);
        return ResponseEntity.created(new URI("/api/records" + result.getId())).body(result);
    }

    @Override
    public ResponseEntity<Record> updateRecord(Record record) {
        Record result = recordRepository.save(record);
        return ResponseEntity.ok().body(result);
    }
}
