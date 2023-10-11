package ru.savelyev.linux.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(description = "Объект для авторизации")
public class UserLogin {
    @NotNull
    @ApiModelProperty(position = 1, example = "MrBeast2004")
    private String username;
    @NotNull
    @ApiModelProperty(position = 2, example = "password123")
    private String password;
}
