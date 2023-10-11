package ru.savelyev.linux.entity;

import ru.savelyev.linux.exception.UnprocessableEntityException;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.apache.commons.validator.routines.EmailValidator;

@Data
@ApiModel(value = "User", description = "Объект пользователя")
public class User {

    @ApiModelProperty(position = 1, example = "10000")
    private Integer id;

    @ApiModelProperty(position = 2, example = "Nagibator2006")
    private String username;

    @ApiModelProperty(position = 3, example = "Nagibator2006@mail.ru")
    private String email;

    @ApiModelProperty(position = 4, example = "hidden")
    private final String password = "";

    public void isValid() {
        if(username.length() < 5 || username.length() > 20) {
            throw new UnprocessableEntityException("Invalid username length");
        }
        if(!EmailValidator.getInstance().isValid(email)){
            throw new UnprocessableEntityException("invalid email address");
        }
    }

}
