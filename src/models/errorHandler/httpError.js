/**
 * HTTP status codes which are used
 * 
 * ## Success ##
 * 200 OK
 * 201 Created
 * 202 Accepted
 * 204 No Content
 * 
 * ## Client errors ##
 * 400 Bad Request
 * 401 Unauthorized
 * 403 Forbidden
 * 404 Not Found
 * 405 Method Not Allowed
 * 408 Request Timeout
 * 409 Conflict
 * 
 * ## Server errors
 * 500 Internal Server Error
 * 503 Service Unavailable
 * 
 */

exports.getErrorMessage = function (error) {
  switch (error.status) {
    case 0:
      return "Error Connection Refused.";
    case 500:
      return error.body.message;
    case 400:
      // return "Bad Reqest.";
      return error.body.message;
    case 401:
      return "Unauthorized user request.";
    case 404:
      return "Not Found.";
    case 408:
      return "Reqest Timeout.";
    default:
      return "Something went wrong.";
  }
}