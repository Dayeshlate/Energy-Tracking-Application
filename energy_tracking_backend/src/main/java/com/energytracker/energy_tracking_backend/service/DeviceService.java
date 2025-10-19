package com.energytracker.energy_tracking_backend.service;

import com.energytracker.energy_tracking_backend.model.Device;
import com.energytracker.energy_tracking_backend.model.DeviceStats;
import com.energytracker.energy_tracking_backend.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    public List<Device> findAll() {
        return deviceRepository.findAll();
    }

    public Optional<Device> findById(Long id) {
        return deviceRepository.findById(id);
    }

    public Device save(Device device) {
        device.setLastUpdated(LocalDateTime.now());
        return deviceRepository.save(device);
    }

    public void deleteById(Long id) {
        deviceRepository.deleteById(id);
    }

    public List<Device> findByLocationId(Long locationId) {
        return deviceRepository.findByLocationId(locationId);
    }

    public List<Device> findByEnergyTypeId(Long energyTypeId) {
        return deviceRepository.findByEnergyTypeId(energyTypeId);
    }

    public List<Device> findByStatus(Device.DeviceStatus status) {
        return deviceRepository.findByStatus(status);
    }

    public DeviceStats getDeviceStats() {
        Long total = deviceRepository.count();
        Long online = deviceRepository.countByStatus(Device.DeviceStatus.ONLINE);
        Long offline = deviceRepository.countByStatus(Device.DeviceStatus.OFFLINE);
        Long warning = deviceRepository.countByStatus(Device.DeviceStatus.WARNING);
        
        return new DeviceStats(total, online, offline, warning);
    }
}
