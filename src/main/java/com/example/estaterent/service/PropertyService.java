package com.example.estaterent.service;

import com.example.estaterent.model.Property;
import org.springframework.http.ResponseEntity;

import java.util.Collection;

public interface PropertyService {


    Collection<Property> getProperties();

    ResponseEntity<?> getProperty(Long id);

    ResponseEntity<?> deleteProperty(Long id);
}
