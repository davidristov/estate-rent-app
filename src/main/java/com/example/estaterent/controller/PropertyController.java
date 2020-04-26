package com.example.estaterent.controller;

import com.example.estaterent.model.Property;
import com.example.estaterent.repository.PropertyRepository;
import com.example.estaterent.service.PropertyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PropertyController {

    private PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping("/properties")
    Collection<Property> getProperties(){
        return propertyService.getProperties();
    }

    @GetMapping("/property/{id}")
    ResponseEntity<?> getProperty(@PathVariable Long id){
        return propertyService.getProperty(id);
    }

    @DeleteMapping("/property/{id}")
    ResponseEntity<?> deleteProperty(@PathVariable Long id){
        return propertyService.deleteProperty(id);
    }

}
