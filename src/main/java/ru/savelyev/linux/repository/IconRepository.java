package ru.savelyev.linux.repository;


import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.savelyev.linux.entity.Icon;

import java.util.List;

@Repository
public interface IconRepository extends CrudRepository<Icon,Integer> {
  List<Icon> findAll(Sort sort);
}
