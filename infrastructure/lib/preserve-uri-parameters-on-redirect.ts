import Dict = NodeJS.Dict

var querystringUtil = require('querystring')

function handler(event: AWSCloudFrontFunction.Event) {
  // noinspection ES6ConvertVarToLetConst
  var response = event.response
  var request = event.request
  var location = response.headers?.['location']?.value
  if (response.statusCode >= 300 && response.statusCode < 400 && location) {
    var queryStringKeys = Object.keys(request.querystring)
    if (queryStringKeys.length) {
      var qs: Dict<string | string[]> = {}
      queryStringKeys.forEach(key => {
        qs[key] = request.querystring[key].multiValue?.map(mv => mv.value) ?? request.querystring[key].value
      })
      var querystring = querystringUtil.stringify(qs)
      response.headers!!['location'].value = `${location}?${querystring}`
    }
  }

  return response
}
