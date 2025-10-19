package com.energytracker.energy_tracking_backend.repository;

import com.energytracker.energy_tracking_backend.model.EnergySource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnergySourceRepository extends JpaRepository<EnergySource, Long> {
    List<EnergySource> findByEnergyTypeId(Long energyTypeId);
}
