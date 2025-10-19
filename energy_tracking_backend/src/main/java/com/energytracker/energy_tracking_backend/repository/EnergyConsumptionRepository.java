package com.energytracker.energy_tracking_backend.repository;

import com.energytracker.energy_tracking_backend.model.EnergyConsumption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EnergyConsumptionRepository extends JpaRepository<EnergyConsumption, Long> {
    List<EnergyConsumption> findByDeviceId(Long deviceId);
    
    @Query("SELECT SUM(ec.measurement.value) FROM EnergyConsumption ec WHERE ec.device.id = :deviceId")
    Double getTotalConsumptionByDevice(@Param("deviceId") Long deviceId);
    
    List<EnergyConsumption> findByRecordedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT ec FROM EnergyConsumption ec WHERE ec.device.id = :deviceId " +
           "AND ec.recordedAt BETWEEN :startDate AND :endDate")
    List<EnergyConsumption> findByDeviceAndDateRange(@Param("deviceId") Long deviceId,
                                                      @Param("startDate") LocalDateTime startDate,
                                                      @Param("endDate") LocalDateTime endDate);
}
