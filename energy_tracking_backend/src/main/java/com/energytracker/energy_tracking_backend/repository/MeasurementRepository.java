package com.energytracker.energy_tracking_backend.repository;

import com.energytracker.energy_tracking_backend.model.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeasurementRepository extends JpaRepository<Measurement, Long> {
    List<Measurement> findByUnit(String unit);
}
