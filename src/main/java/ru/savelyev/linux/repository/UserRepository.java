package ru.savelyev.linux.repository;


import ru.savelyev.linux.entity.UserDB;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserDB,Integer> {
    UserDB findUserByUsername(String username);
}
