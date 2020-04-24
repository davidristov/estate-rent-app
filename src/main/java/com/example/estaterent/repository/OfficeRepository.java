package com.example.estaterent.repository;

import com.example.estaterent.model.Office;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfficeRepository extends JpaRepository<Office, Long> {
}
