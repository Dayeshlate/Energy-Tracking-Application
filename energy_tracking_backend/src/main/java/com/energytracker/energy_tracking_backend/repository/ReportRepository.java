package com.energytracker.energy_tracking_backend.repository;

import com.energytracker.energy_tracking_backend.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByUserId(Long userId);
    List<Report> findByDeviceId(Long deviceId);
    List<Report> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
}
