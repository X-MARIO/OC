package ru.savelyev.linux.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.savelyev.linux.entity.Icon;
import ru.savelyev.linux.exception.BadRequestException;
import ru.savelyev.linux.service.FileService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Api(tags = "file")
@RequiredArgsConstructor
public class FileController {
    private final FileService fileService;

    @GetMapping("/icons")
    public List<Icon> getAllIcons() {
        return fileService.getAll();
    }

    @PostMapping("/icons")
    public Icon createIcon(@RequestBody(required = false) Icon icon) {
        if (icon == null) {
            throw new BadRequestException("Request body is empty");
        }
        return fileService.saveIcon(icon);
    }
    @PatchMapping("/icons/{id}")
    public Icon partialUpdateIcon(@PathVariable Integer id, @RequestBody(required = false) Map<String, Object> fields) {
        return fileService.partialUpdateIcon(id, fields);
    }

    @DeleteMapping("/icons/{id}")
    public void deleteIcon(@PathVariable("id") Integer id) {
        fileService.deleteById(id);
    }

    @PutMapping("/icons/{id}")
    public Icon updateIcon(@PathVariable("id") Integer id, @RequestBody(required = false) Icon icon) {
        if (icon == null) {
            throw new BadRequestException("Request body is empty");
        }
        return fileService.updateById(id, icon);
    }

}
