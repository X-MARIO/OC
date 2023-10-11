package ru.savelyev.linux.config;


import com.fasterxml.jackson.databind.ObjectMapper;
import ru.savelyev.linux.util.HttpError;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json");

        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString( new HttpError(HttpStatus.UNAUTHORIZED.value(),
                authException.getMessage()));
        try (OutputStream out = response.getOutputStream()) {
            byte[] data = json.getBytes();
            out.write(data, 0, data.length);
            out.flush();
        }
    }


}
