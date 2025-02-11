# Backend API Ducomentation 

## User Registration Endpoint

## Endpoint

`POST /user/register`

## Description

This endpoint is used to register a new user. The user needs to provide an email, password, and first name.

## Request Body

The request body should be a JSON object containing the following fields:

- `email`: A valid email address (string).
- `password`: A password with at least 6 characters (string).
- `firstName`: A first name with at least 3 characters (string).

Example:

```json
{
  "email": "example@example.com",
  "password": "password123",
  "firstName": "John"
}
```

## Response

### Success

- **Status Code**: `201 Created`
- **Body**: A JSON object containing the user details.

Example:

```json
{
  "id": "user_id",
  "email": "example@example.com",
  "firstName": "John"
}
```

### Error

- **Status Code**: `400 Bad Request`
- **Body**: A JSON object containing the error message.

Example:

```json
{
  "errors": [
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

## Example Response

### Success Response

```json
{
  "user": {
    "id": "user_id",
    "email": "example@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": "jwt_token"
}
```

### Error Response

```json
{
  "errors": [
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

## User Login Endpoint

### Endpoint

`POST /user/login`

### Description

This endpoint is used to log in an existing user. The user needs to provide an email and password.

### Request Body

The request body should be a JSON object containing the following fields:

- `email`: A valid email address (string).
- `password`: A password with at least 6 characters (string).

Example:

```json
{
  "email": "example@example.com",
  "password": "password123"
}
```

### Response

#### Success

- **Status Code**: `200 OK`
- **Body**: A message indicating successful login.

Example:

```json
{
  "message": "you logged in successfully"
}
```

#### Error

- **Status Code**: `400 Bad Request`
- **Body**: A message indicating invalid email or password.

Example:

```json
{
  "message": "Invalid email or password"
}
```

## User Logout Endpoint

### Endpoint

`GET /user/logout`

### Description

This endpoint is used to log out an authenticated user.

### Response

#### Success

- **Status Code**: `200 OK`
- **Body**: A message indicating successful logout.

Example:

```json
{
  "message": "you logged out successfully"
}
```
````
