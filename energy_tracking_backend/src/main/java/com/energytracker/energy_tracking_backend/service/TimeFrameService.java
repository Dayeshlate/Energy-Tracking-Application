package com.energytracker.energy_tracking_backend.service;

import com.energytracker.energy_tracking_backend.model.TimeFrame;
import com.energytracker.energy_tracking_backend.repository.TimeFrameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TimeFrameService {

    @Autowired
    private TimeFrameRepository timeFrameRepository;

    public List<TimeFrame> findAll() {
        return timeFrameRepository.findAll();
    }

    public Optional<TimeFrame> findById(Long id) {
        return timeFrameRepository.findById(id);
    }

    public TimeFrame save(TimeFrame timeFrame) {
        return timeFrameRepository.save(timeFrame);
    }

    public void deleteById(Long id) {
        timeFrameRepository.deleteById(id);
    }

    public List<TimeFrame> findOverlapping(LocalDateTime startTime, LocalDateTime endTime) {
        return timeFrameRepository.findOverlapping(startTime, endTime);
    }
}
