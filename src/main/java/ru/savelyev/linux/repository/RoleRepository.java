package ru.savelyev.linux.repository;


import ru.savelyev.linux.entity.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends CrudRepository<Role,Integer> {
  Role findRoleByRole(String role);
}
