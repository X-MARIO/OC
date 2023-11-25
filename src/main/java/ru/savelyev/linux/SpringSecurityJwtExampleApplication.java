package ru.savelyev.linux;

import ru.savelyev.linux.entity.Icon;
import ru.savelyev.linux.entity.Role;
import ru.savelyev.linux.entity.UserDB;
import ru.savelyev.linux.repository.IconRepository;
import ru.savelyev.linux.repository.RoleRepository;
import ru.savelyev.linux.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication
@RequiredArgsConstructor
public class SpringSecurityJwtExampleApplication {

    private final UserRepository repository;

    private final IconRepository iconRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @PostConstruct
    public void initUsers() {
        Role role = new Role(1, "ROLE_ADMIN");
        Role role2 = new Role(2, "ROLE_USER");
        roleRepository.saveAll(Stream.of(role, role2).collect(Collectors.toList()));
        List<UserDB> userDBS = Stream.of(
                new UserDB(null, "pasha", passwordEncoder.encode("password"), "pasha@gmail.com", null, null, Stream.of(role, role2).collect(Collectors.toList())),
                new UserDB(null, "maxim", passwordEncoder.encode("pwd1"), "user1@gmail.com", null, null, Stream.of(role2).collect(Collectors.toList()))
        ).collect(Collectors.toList());
        repository.saveAll(userDBS);
        Icon icon =new Icon(1,"hype","test",6, "text/plain","fdsfdsfsfs");
        Icon icon3 =new Icon(3,"hype","test",1, "text/plain","fdsfdsfsfs");
        Icon icon2 =new Icon(2,"hype","test",3, "text/plain","fdsfdsfsfs");
        iconRepository.saveAll(Stream.of(icon, icon2,icon3).collect(Collectors.toList()));
    }

    public static void main(String[] args) {
        SpringApplication.run(SpringSecurityJwtExampleApplication.class, args);
    }

}
