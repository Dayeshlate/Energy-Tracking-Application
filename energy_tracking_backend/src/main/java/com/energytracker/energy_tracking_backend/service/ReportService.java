package com.energytracker.energy_tracking_backend.service;

import com.energytracker.energy_tracking_backend.model.Report;
import com.energytracker.energy_tracking_backend.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public List<Report> findAll() {
        return reportRepository.findAll();
    }

    public Optional<Report> findById(Long id) {
        return reportRepository.findById(id);
    }

    public Report save(Report report) {
        return reportRepository.save(report);
    }

    public void deleteById(Long id) {
        reportRepository.deleteById(id);
    }

    public List<Report> findByUserId(Long userId) {
        return reportRepository.findByUserId(userId);
    }

    public List<Report> findByDeviceId(Long deviceId) {
        return reportRepository.findByDeviceId(deviceId);
    }

    public List<Report> findByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return reportRepository.findByCreatedAtBetween(startDate, endDate);
    }
}
