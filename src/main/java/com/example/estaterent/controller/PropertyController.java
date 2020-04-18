package com.example.estaterent.controller;

import com.example.estaterent.model.Property;
import com.example.estaterent.repository.PropertyRepository;
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

    private PropertyRepository propertyRepository;

    public PropertyController(PropertyRepository propertyRepository){
        this.propertyRepository = propertyRepository;
    }

    @GetMapping("/properties")
    Collection<Property> properties(){
        return propertyRepository.findAll();
    }

    @GetMapping("/property/{id}")
    ResponseEntity<?> getProperty(@PathVariable Long id){
        Optional<Property> property = propertyRepository.findById(id);
        return property.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/property")
    ResponseEntity<Property> createProperty(@Valid @RequestBody Property property) throws URISyntaxException {
        Property result = propertyRepository.save(property);
        return ResponseEntity.created(new URI("/api/property" + result.getId())).body(result);
    }

    @PutMapping("/property/{id}")
    ResponseEntity<Property> updateProperty(@Valid @RequestBody Property property){
        Property result = propertyRepository.save(property);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/property/{id}")
    ResponseEntity<?> deleteProperty(@PathVariable Long id){
        propertyRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
