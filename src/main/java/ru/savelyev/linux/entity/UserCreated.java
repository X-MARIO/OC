package ru.savelyev.linux.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Data
@ApiModel(description = "Объект для создания пользователя")
public class UserCreated {
    @Size(min = 5,max=20, message = "username should be more than 4 and less then 20 symbols")
    @ApiModelProperty(position = 1, example = "mrBeast2005")
    private String username;

    @Email(message = "invalid email")
    @ApiModelProperty(position =2, example = "vasyapupkin@gmail.com")
    private String email;
    @ApiModelProperty(position = 3, example = "qwerty123")
    @Size(min = 5,max=20, message = "password should be more than 4 and less then 20 symbols")
    private String password;
}
