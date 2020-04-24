package com.example.estaterent.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "department")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

}
