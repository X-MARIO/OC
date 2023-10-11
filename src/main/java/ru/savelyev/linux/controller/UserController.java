package ru.savelyev.linux.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import ru.savelyev.linux.entity.*;
import ru.savelyev.linux.exception.BadRequestException;
import ru.savelyev.linux.service.UserService;
import ru.savelyev.linux.util.HttpError;
import ru.savelyev.linux.util.JwtUtil;
import ru.savelyev.linux.util.UserMapper;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@Api(tags = "users")
@RequestMapping("/users")
public class UserController {
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    private final UserMapper userMapper;

    @ApiResponses(value = {//
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 404, response = HttpError.class, message = "{\n\"code\": 404,\n \"message\" : \"User not found\"\n}")})
    @GetMapping("/{id}")
    public User findUserById(@PathVariable("id") Integer id) {
        return userMapper.mapToDTO(userService.findUserById(id));
    }

    @ApiResponses(value = {//
            @ApiResponse(code = 200, message = "{\n\"access_token\": \"{jwt-token}\"\n" +
                    "  \"token_type\": \"token_type(regular/temporary)\"\n" +
                    "  \"expires_in\": \"time(sec)\"\n}"),
            @ApiResponse(code = 400, message = "{\n\"code\": 400,\n \"message\" : \"Request body is empty\"\n}", response = HttpError.class),
            @ApiResponse(code = 401, message = "{\n\"code\": 401,\n \"message\" : \"invalid username/password\"\n}", response = HttpError.class)})
    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public UserSecrets generateToken(@Valid @RequestBody(required = false) UserLogin userLogin) throws Exception {
        if (userLogin == null) {
            throw new BadRequestException("Request body is empty");
        }
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userLogin.getUsername(), userLogin.getPassword())
            );
        } catch (Exception ex) {
            throw new AuthorizationServiceException("invalid username/password");
        }
        return jwtUtil.getDetailedResponse(userLogin.getUsername());
    }

    @ResponseStatus(HttpStatus.OK)
    @ApiResponses(value = {//
            @ApiResponse(code = 400, message = "{\n\"code\": 400,\n \"message\" : \"Request body is empty\"\n}", response = HttpError.class),
            @ApiResponse(code = 422, message = "{\n\"code\": 422,\n \"message\" : \"invalid fields in request\"\n}", response = HttpError.class)
    })
    @PostMapping()
    public void createUser(@Valid @RequestBody(required = false) UserCreated userCreated) {
        if (userCreated == null) {
            throw new BadRequestException("Request body is empty");
        }
        userService.createUser(userMapper.mapToEntity(userCreated));
    }

    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "{\n\"code\": 400,\n \"message\" : \"Bad request\"\n}", response = HttpError.class),
            @ApiResponse(code = 401, message = "{\n\"code\": 401,\n \"message\" : \"Full authentication is required to access this resource\"\n}", response = HttpError.class),
            @ApiResponse(code = 422, message = "{\n\"code\": 422,\n \"message\" : \"invalid fields in request\"\n}")
    })
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public User updateUser(@PathVariable("id") Integer id, @RequestBody(required = false) User user) {
        if (user == null) {
            throw new BadRequestException("Request body is empty");
        }
        if (!Objects.equals(id, user.getId())) {
            throw new BadRequestException("path variable id doesn't match with request body's id");
        }
        user.isValid();
        return userMapper.mapToDTO(userService.updateUser(id, userMapper.mapToEntity(user)));
    }

    @PostMapping("/change-password")
    @ResponseStatus(HttpStatus.OK)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "{\n\"code\": 400,\n \"message\" : \"Bad request\"\n}", response = HttpError.class)
    })
    public void changePassword(@RequestBody ChangePassword changePassword, Principal principal) {
        userService.changePassword(changePassword, principal);
    }
}
