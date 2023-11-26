package ru.savelyev.linux.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.savelyev.linux.entity.Icon;
import ru.savelyev.linux.exception.BadRequestException;
import ru.savelyev.linux.repository.IconRepository;

import javax.persistence.EntityNotFoundException;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

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
    public Icon partialUpdateIcon(Integer id, Map<String,Object> fields) {
        System.out.println(fields);
        Icon existingIcon = findById(id);
        fields.forEach((key, value) -> {
            if(key.equals("id")) {
                return;
            }
            try {
                Field field = existingIcon.getClass().getDeclaredField(key);
                field.setAccessible(true);
                field.set(existingIcon, value);
            } catch (NoSuchFieldException e) {
                throw new BadRequestException("Field not found: " + key);
            } catch (IllegalAccessException e) {
                throw new BadRequestException("Error setting field value: " + key);
            }
        });
        return iconRepository.save(existingIcon);
    }
}
