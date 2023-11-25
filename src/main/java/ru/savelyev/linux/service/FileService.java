package ru.savelyev.linux.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.savelyev.linux.entity.Icon;
import ru.savelyev.linux.repository.IconRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FileService {

    private final IconRepository iconRepository;

    public List<Icon> getAll() {
        return iconRepository.findAll(Sort.by(Sort.Direction.ASC, "place"));
    }

    public Icon findById(Integer id) {
        return iconRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Icon not found")
        );
    }

    public void deleteById(Integer id) {
        iconRepository.deleteById(id);
    }

    public Icon updateById(Integer id, Icon newIcon) {
        Icon icon = findById(id);
        icon.setIcon(newIcon.getIcon());
        icon.setPlace(newIcon.getPlace());
        icon.setContent(newIcon.getContent());
        icon.setName(newIcon.getName());
        icon.setMIME(newIcon.getMIME());
        return iconRepository.save(icon);
    }

    public Icon saveIcon(Icon icon) {
        icon.setId(null);
        return iconRepository.save(icon);
    }
}
