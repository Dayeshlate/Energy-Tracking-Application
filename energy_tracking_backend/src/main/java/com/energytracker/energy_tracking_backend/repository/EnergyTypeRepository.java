package com.energytracker.energy_tracking_backend.repository;

import com.energytracker.energy_tracking_backend.model.EnergyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnergyTypeRepository extends JpaRepository<EnergyType, Long> {
}
