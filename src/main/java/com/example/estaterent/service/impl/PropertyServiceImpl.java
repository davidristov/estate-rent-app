package com.example.estaterent.service.impl;

import com.example.estaterent.model.Property;
import com.example.estaterent.repository.PropertyRepository;
import com.example.estaterent.service.PropertyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class PropertyServiceImpl implements PropertyService {

    private PropertyRepository propertyRepository;

    public PropertyServiceImpl(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    @Override
    public Collection<Property> getProperties(){
        return propertyRepository.findAll();
    }

    @Override
    public ResponseEntity<?> getProperty(Long id){
        Optional<Property> property = propertyRepository.findById(id);
        return property.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<?> deleteProperty(Long id){
        propertyRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
