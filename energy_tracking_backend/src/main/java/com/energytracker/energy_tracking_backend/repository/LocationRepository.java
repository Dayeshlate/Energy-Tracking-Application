package com.energytracker.energy_tracking_backend.repository;

import com.energytracker.energy_tracking_backend.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
}
