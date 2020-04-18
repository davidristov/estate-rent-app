package com.example.estaterent.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Data
@Table(name = "property")
public class Property {

    @Id
    private Long id;

    @NonNull
    private String name;

}
