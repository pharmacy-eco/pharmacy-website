enum E_KEY_COOKIE {
  access_token = "access_token",
  refresh_token = "refresh_token"
}

enum E_CODE_HTTP_CLIENT {
  BadRequest = 400,
  NotFound = 404,
  Unauthorized = 401,
  Forbidden = 403,
  Validate = 422,
  TooManyRequests = 429,
  InternalServerError = 500
}

enum E_AUTH_ROLE {
  Admin = "Admin",
  User = "User"
}

export { E_KEY_COOKIE, E_CODE_HTTP_CLIENT, E_AUTH_ROLE };
