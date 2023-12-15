package ru.savelyev.linux.controller;


import org.springframework.web.bind.annotation.RequestParam;
import ru.savelyev.linux.entity.ProcessInfo;
import ru.savelyev.linux.service.LinuxCoreService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api")
@Api(tags = "linux")
@RequiredArgsConstructor
public class LinuxController {
    private final LinuxCoreService linuxCoreService;

    @GetMapping("/processes")
    public List<ProcessInfo> getProcessList() {
        return linuxCoreService.getAllService();
    }

    @GetMapping("/terminal")
    public String executeCommand(@RequestParam("command") String command) {
        return linuxCoreService.executeTerminalCommand(command);
    }
}

