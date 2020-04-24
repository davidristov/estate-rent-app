package com.example.estaterent.model;

import lombok.Data;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Data
@Table(name = "employee")
public class Employee{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String surname;
    private Instant dateOfEmployment;
    private String residenceAddress;
    private String embg;
    private String phoneNumber;

    @ManyToOne
    private Office office;

    @ManyToOne
    private Department department;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}