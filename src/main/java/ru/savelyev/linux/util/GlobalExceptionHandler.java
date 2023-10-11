package ru.savelyev.linux.util;


import ru.savelyev.linux.exception.BadRequestException;
import ru.savelyev.linux.exception.UnprocessableEntityException;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.persistence.EntityNotFoundException;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@Slf4j
@RequiredArgsConstructor
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public HttpError handleInvalidDataException(EntityNotFoundException e) {
        log.error(e.getMessage(), e);
        return new HttpError(HttpStatus.NOT_FOUND.value(), e.getMessage());
    }

    @ExceptionHandler(AuthorizationServiceException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public HttpError handleAuthorizationException(AuthorizationServiceException  e) {
        log.error(e.getMessage(), e);
        return new HttpError(HttpStatus.UNAUTHORIZED.value(), e.getMessage());
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public HttpError handleJWTExpired(BadRequestException  e) {
        log.error(e.getMessage(), e);
        return new HttpError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
    }

    @ExceptionHandler(JwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public HttpError handleJWTExpired(JwtException  e) {
        log.error(e.getMessage(), e);
        return new HttpError(HttpStatus.UNAUTHORIZED.value(), e.getMessage());
    }

    @ExceptionHandler(UnprocessableEntityException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ResponseBody
    public HttpError handleJWTExpired(UnprocessableEntityException  e) {
        log.error(e.getMessage(), e);
        return new HttpError(HttpStatus.UNPROCESSABLE_ENTITY.value(), e.getMessage());
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        log.error(ex.getMessage(), ex);
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return handleExceptionInternal(ex, new HttpError(HttpStatus.UNPROCESSABLE_ENTITY.value(),
                        errors.toString().replace("{","").replace("}","")),
                new HttpHeaders(), HttpStatus.UNPROCESSABLE_ENTITY, request);
    }

}