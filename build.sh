#!/bin/bash

# Проверяем наличие JDK 17
if ! java -version 2>&1 | grep "version \"17" &> /dev/null
then
    echo "JDK 17 не найдена. Установка..."
    # Устанавливаем JDK 17 с помощью пакетного менеджера
    sudo apt update
    sudo apt install -y openjdk-17-jdk
    echo "JDK 17 успешно установлена."
fi

# Проверяем наличие Maven
if ! command -v mvn &> /dev/null
then
    echo "Apache Maven не найден. Установка..."
    # Устанавливаем Maven с помощью пакетного менеджера
    sudo apt update
    sudo apt install -y maven
    echo "Apache Maven успешно установлен."
fi

# Перейдите в директорию с вашим проектом (замените /путь/к/вашему/проекту на фактический путь)
cd "$(dirname "$0")"

# Выполните команду Maven для очистки, сборки и установки проекта
mvn clean install

# Выполните команду Maven для запуска Spring Boot приложения
mvn spring-boot:run