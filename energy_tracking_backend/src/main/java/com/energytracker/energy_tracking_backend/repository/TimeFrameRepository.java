package com.energytracker.energy_tracking_backend.repository;

import com.energytracker.energy_tracking_backend.model.TimeFrame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TimeFrameRepository extends JpaRepository<TimeFrame, Long> {
    @Query("SELECT t FROM TimeFrame t WHERE " +
           "(t.startTime <= :endTime AND t.endTime >= :startTime)")
    List<TimeFrame> findOverlapping(@Param("startTime") LocalDateTime startTime,
                                     @Param("endTime") LocalDateTime endTime);
}
