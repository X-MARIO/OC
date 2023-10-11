package ru.savelyev.linux.entity;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Data
@ApiModel(value = "UserSecrets", description = "Объект- обертка, который содержит токен и информацию о нем ")
@NoArgsConstructor
@AllArgsConstructor
public class UserSecrets {
    public String accessToken;
    public String tokenType;
    public int expiresIn;

}
