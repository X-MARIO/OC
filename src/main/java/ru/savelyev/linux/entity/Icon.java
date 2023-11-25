package ru.savelyev.linux.entity;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@ApiModel(value = "Icon", description = "Объект ярлыка")
@AllArgsConstructor
@NoArgsConstructor
public class Icon {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String icon;
    private int place;
    private String MIME;
    private String content;
}
