package com.example.estaterent.repository;

import com.example.estaterent.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    Property findByName(String name);

}
