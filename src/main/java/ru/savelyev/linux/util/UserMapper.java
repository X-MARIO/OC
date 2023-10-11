package ru.savelyev.linux.util;


import ru.savelyev.linux.entity.UserDB;
import ru.savelyev.linux.entity.UserCreated;
import ru.savelyev.linux.entity.User;
import ru.savelyev.linux.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;


@Component
@RequiredArgsConstructor
public class UserMapper {
    private final ModelMapper mapper;


    private final RoleRepository roleRepository;

    @PostConstruct
    public void setupMapper() {
        mapper.typeMap(User.class, UserDB.class);
        mapper.typeMap(UserDB.class, User.class);
        mapper.typeMap(UserCreated.class, UserDB.class);
    }

    public User mapToDTO(UserDB userDB) {
        return mapper.map(userDB, User.class);
    }

    public UserDB mapToEntity(User dto) {
        return mapper.map(dto, UserDB.class);
    }

    public UserDB mapToEntity (UserCreated created) {return mapper.map(created, UserDB.class);}

}
