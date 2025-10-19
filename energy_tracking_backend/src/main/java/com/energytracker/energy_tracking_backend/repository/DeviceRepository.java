package com.energytracker.energy_tracking_backend.repository;

import com.energytracker.energy_tracking_backend.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    List<Device> findByLocationId(Long locationId);
    List<Device> findByEnergyTypeId(Long energyTypeId);
    List<Device> findByStatus(Device.DeviceStatus status);
    Long countByStatus(Device.DeviceStatus status);
}
