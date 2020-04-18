package com.example.estaterent.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.Instant;

@NoArgsConstructor
@Data
@Entity
@Table(name = "record")
public class Record {

    @Id
    private Long id;

    private String description;
    private String location;
    private Instant availableFromDate;
    private String owner;
    private String phoneNumber;

    @JsonIgnore
    @ManyToOne
    private User user;

    @ManyToOne
    private Property property;

}
