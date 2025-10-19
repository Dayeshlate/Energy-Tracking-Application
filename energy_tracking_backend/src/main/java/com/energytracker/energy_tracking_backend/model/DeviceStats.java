package com.energytracker.energy_tracking_backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeviceStats {
    private Long total;
    private Long online;
    private Long offline;
    private Long warning;
}
