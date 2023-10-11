package ru.savelyev.linux.util;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@ApiModel(value = "HttpError", description = "Объект для ошибки")
public class HttpError {
    private int code;
    private String message;
}
