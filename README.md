# Для запуска проекта в режиме разработки (dev) потребуется

1. В nvm выбрать nodejs 20.9.0
2. Запустить `npm i nx@17.2.7 -g`
3. Установить зависимости командой `npm ci --force`
4. Запустить Docker командой `docker-compose -f docker-compose.yml -f develop.docker-compose.yml up --build`
5. Запустить Docker командой `docker-compose -f docker-compose.yml -f prod.docker-compose.yml up --build` в режиме продакшена

# OC
