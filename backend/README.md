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

## User Profile Endpoint

### Endpoint

`GET /users/profile`

### Description

This endpoint is used to fetch the profile of the authenticated user.

### Headers

- `Authorization: Bearer <token>` (required)

### Response

#### Success

- **Status Code**: `200 OK`
- **Body**: A JSON object containing the user profile data.

Example:

```json
{
  "_id": "user_id",
  "name": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "role": "user",
  "address": "123 Main St",
  "phoneNumber": "123-456-7890",
  "socketId": "socket_id"
}
```

#### Error

- **Status Code**: `401 Unauthorized`
- **Body**: A message indicating that the token is missing or invalid.

Example:

```json
{
  "message": "Unauthorized"
}
```

- **Status Code**: `404 Not Found`
- **Body**: A message indicating that the user is not found.

Example:

```json
{
  "message": "User not found"
}
```

### Example Request

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3000/users/profile
```


# Captain API's
## Captain Registration Endpoint

### Endpoint

`POST /captain/register`

### Description

This endpoint is used to register a new captain. The captain needs to provide various details including email, password, and vehicle information.

### Request Body

The request body should be a JSON object containing the following fields:

- `email`: A valid email address (string).
- `password`: A password with at least 6 characters (string).
- `firstName`: A first name with at least 3 characters (string).
- `lastName`: A last name with at least 3 characters (string).
- `phoneNumber`: A phone number with at least 11 characters (string).
- `vehicleColor`: The color of the vehicle (string).
- `vehicleModel`: The model of the vehicle (string).
- `vehiclePlate`: The plate number of the vehicle (string).
- `vehicleType`: The type of the vehicle, which should be one of 'bike', 'car', 'van', or 'truck' (string).
- `vehicleCapacity`: The capacity of the vehicle (number).

Example:

```json
{
  "email": "captain@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "12345678901",
  "vehicleColor": "Red",
  "vehicleModel": "Toyota",
  "vehiclePlate": "XYZ123",
  "vehicleType": "car",
  "vehicleCapacity": 4
}
```

### Response

#### Success

- **Status Code**: `201 Created`
- **Body**: A JSON object containing the captain details.

Example:

```json
{
  "id": "captain_id",
  "email": "captain@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Error

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
