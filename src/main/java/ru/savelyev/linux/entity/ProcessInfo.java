package ru.savelyev.linux.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProcessInfo {
    private String user;
    private int pid;
    private double cpuUsage;
    private double memoryUsage;
    private int vsz;
    private int rss;
    private String tty;
    private String stat;
    private String start;
    private String time;
    private String command;

    public ProcessInfo(String user, String pid, String cpuUsage,
                       String memoryUsage, String vsz, String rss, String tty, String stat, String start, String time, String command) {
        this.user = user;
        this.pid = Integer.parseInt(pid);
        this.cpuUsage = Double.parseDouble(cpuUsage) ;
        this.memoryUsage =  Double.parseDouble(memoryUsage);
        this.vsz = Integer.parseInt(vsz);
        this.rss = Integer.parseInt(rss);
        this.tty = tty;
        this.stat = stat;
        this.start = start;
        this.time = time;
        this.command = command;
    }
}
