package ru.savelyev.linux.service;


import ru.savelyev.linux.entity.ProcessInfo;
import org.springframework.stereotype.Service;
import ru.savelyev.linux.exception.BadRequestException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class LinuxCoreService {

    public List<ProcessInfo> getAllService() {
        List<ProcessInfo> processInfos = new ArrayList<>();
        try {
            Process process = Runtime.getRuntime().exec("ps aux");
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line = reader.readLine();
            while ((line = reader.readLine()) != null) {
                processInfos.add(mapFromString(line));
            }
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return processInfos;
    }
    private ProcessInfo mapFromString(String source) {
        String[] split = source.split("\\s+");
        return new ProcessInfo(split[0], split[1], split[2], split[3], split[4], split[5], split[6], split[7], split[8],
                split[9], split[10]);
    }


    public String executeTerminalCommand(String command) {
        try {
            Process process = Runtime.getRuntime().exec(command);
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
           return reader.lines().collect(Collectors.joining());
        } catch (IOException e) {
            throw new BadRequestException(e.getMessage());
        }

    }
}
