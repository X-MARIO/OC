package ru.savelyev.linux.entity;

import lombok.Data;
@Data
public class ChangePassword {
    private String currentPassword;
    private String newPassword;
    private String newPasswordRepeat;

}
