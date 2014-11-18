
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.beforeSave("Quote", function(request, response) {

	var quoteText = request.object.get("quoteText");
	var attribution = request.object.get("by");

	if (quoteText.length) {

		if(attribution.length) {
			response.success();
		} else {
			request.object.set("by", "Anonymous");
			response.success();
		}

	} else {
		response.error("What is a quote without text?");
	}
	
});
