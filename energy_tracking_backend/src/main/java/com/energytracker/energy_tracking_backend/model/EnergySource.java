package com.energytracker.energy_tracking_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "energy_sources")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnergySource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "energy_type_id")
    private EnergyType energyType;
}
