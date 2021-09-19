export function slackErrorHandler(error: any) {
  console.log(error)
  return {
    statusCode: error.status,
    message: error.message,
    meta: error,
  }
}
