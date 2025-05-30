# AuthStarter

Простой стартовый проект для аутентификации и авторизации с использованием JWT.

---

## Описание

**AuthStarter** — базовый API для регистрации, входа и получения информации о пользователе. Использует JSON Web Token (JWT) для безопасной аутентификации.

---

## Запуск

1. Клонируйте репозиторий:
   ```bash
   git clone <url-репозитория>
   cd <папка-проекта>

2. Установите зависимости:

   ```bash
   npm install
   ```
3. Создайте файл `.env` в корне проекта и добавьте переменную окружения:

   ```
   SECRET=your_jwt_secret_key
   ```
4. Запустите сервер:

   ```bash
   npm start
   ```
5. Сервер будет доступен по адресу:
   `http://localhost:7788`

---

## API

### Регистрация

`POST /api/auth/register`

* **Параметры в теле запроса:**

  ```json
  {
    "username": "user123",
    "password": "secret123"
  }
  ```

* **Ответы:**

  * `201 Created` — пользователь успешно зарегистрирован, возвращается JWT токен
  * `400 Bad Request` — отсутствуют обязательные поля или длина не соответствует требованиям
  * `409 Conflict` — имя пользователя уже занято
  * `500 Internal Server Error` — внутренняя ошибка сервера

---

### Вход

`POST /api/auth/login`

* **Параметры в теле запроса:**

  ```json
  {
    "username": "user123",
    "password": "secret123"
  }
  ```

* **Ответы:**

  * `200 OK` — успешный вход, возвращается JWT токен
  * `401 Unauthorized` — неверные учетные данные
  * `500 Internal Server Error` — внутренняя ошибка сервера

---

### Получить данные пользователя

`GET /api/users/me`

* **Требуется заголовок авторизации:**

  ```
  Authorization: Bearer <JWT_TOKEN>
  ```

* **Ответы:**

  * `200 OK` — возвращает данные пользователя (без пароля)
  * `401 Unauthorized` — отсутствует или истек токен авторизации
  * `500 Internal Server Error` — внутренняя ошибка сервера

---

## Пример успешного ответа `/api/users/me`

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "60c72b2f9b1e8b001f8e4b8a",
      "username": "user123",
      "createdAt": "2023-04-25T14:15:22Z"
    }
  }
}
```

---

## Технологии

* Node.js + Express
* MongoDB + Mongoose
* JSON Web Token (JWT) для аутентификации
* Swagger/OpenAPI для документации
