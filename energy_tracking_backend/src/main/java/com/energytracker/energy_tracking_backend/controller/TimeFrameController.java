package com.energytracker.energy_tracking_backend.controller;

import com.energytracker.energy_tracking_backend.model.TimeFrame;
import com.energytracker.energy_tracking_backend.service.TimeFrameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/time-frames")
@CrossOrigin(origins = "*")
public class TimeFrameController {

    @Autowired
    private TimeFrameService timeFrameService;

    @GetMapping
    public ResponseEntity<List<TimeFrame>> getAllTimeFrames() {
        return ResponseEntity.ok(timeFrameService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TimeFrame> getTimeFrameById(@PathVariable Long id) {
        return timeFrameService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TimeFrame> createTimeFrame(@RequestBody TimeFrame timeFrame) {
        TimeFrame savedTimeFrame = timeFrameService.save(timeFrame);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTimeFrame);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TimeFrame> updateTimeFrame(@PathVariable Long id, @RequestBody TimeFrame timeFrame) {
        return timeFrameService.findById(id)
                .map(existingTimeFrame -> {
                    timeFrame.setId(id);
                    return ResponseEntity.ok(timeFrameService.save(timeFrame));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTimeFrame(@PathVariable Long id) {
        if (timeFrameService.findById(id).isPresent()) {
            timeFrameService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/overlapping")
    public ResponseEntity<List<TimeFrame>> getOverlappingTimeFrames(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        return ResponseEntity.ok(timeFrameService.findOverlapping(startTime, endTime));
    }
}
