package ru.savelyev.linux.service;


import ru.savelyev.linux.entity.ChangePassword;
import ru.savelyev.linux.entity.UserDB;
import ru.savelyev.linux.exception.BadRequestException;
import ru.savelyev.linux.repository.RoleRepository;
import ru.savelyev.linux.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.security.Principal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    public UserDB findUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException("User not found")
                );
    }

    public void createUser(UserDB userDB) {
        userDB.setPassword(passwordEncoder.encode(userDB.getPassword()));
        userDB.setRoles(List.of(roleRepository.findRoleByRole("ROLE_USER")));
        userRepository.save(userDB);
    }

    public UserDB updateUser(Integer id, UserDB userDB) {
        UserDB userDBById = findUserById(id);
        userDBById.setEmail(userDB.getEmail());
        userDBById.setUsername(userDB.getUsername());
        return userRepository.save(userDBById);
    }

    public void changePassword(ChangePassword changePassword, Principal principal) {
        if (!changePassword.getNewPassword().equals(changePassword.getNewPasswordRepeat())) {
            throw new BadRequestException("The passwords you entered do not match");
        }
        UserDB userDBByUsername = userRepository.findUserByUsername(principal.getName());
        if (passwordEncoder.matches(changePassword.getCurrentPassword(), userDBByUsername.getPassword())) {
            userDBByUsername.setPassword(passwordEncoder.encode(changePassword.getNewPassword()));
            userRepository.save(userDBByUsername);
        } else {
            throw new BadRequestException("Wrong current password");
        }
    }

}
