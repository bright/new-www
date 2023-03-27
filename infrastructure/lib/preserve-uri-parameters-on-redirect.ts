function handler(event: AWSCloudFrontFunction.Event) {
  // noinspection ES6ConvertVarToLetConst
  var response = event.response
  var request = event.request
  var location = response.headers?.['location']
  if (response.statusCode >= 300 && response.statusCode < 400 && location) {

  }

  return response
}
