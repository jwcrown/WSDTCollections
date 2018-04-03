//backbone model
var TravelTimeModel = Backbone.Model.extend({
    defaults:{
    }
});

//backbone collection
var TravelTimeCollection = Backbone.Collection.extend({
    model: TravelTimeModel,
    url: "http://wsdot.com/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson?AccessCode=e901f9a2-936d-49fb-90a7-304f89fb5431",
});

var travelTimes = new TravelTimeCollection();

travelTimes.fetch()
.then(function(){
    _.each(travelTimes.models, function(b){
        console.log(b.attributes);//The travelTimes collection
    })
    console.log(travelTimes.models.length)//The length of the travelTimes collection
    console.log(travelTimes.models[30].attributes)//The 30th model in the list
    console.log("Current time from " + _.first(travelTimes.models).attributes.Description + " is: " + _.first(travelTimes.models).attributes.CurrentTime + " minutes.")//The CurrentTime of the first model
    console.log(_.filter(travelTimes.models, function(time){ return time.attributes.CurrentTime == 10 }))//All the models with a CurrentTime of 10
    console.log(_.find(travelTimes.models, function(time){ return time.attributes.Name == "Bellevue-Seattle via 520 (WB PM)"}))//The first model with the Name: "Bellevue-Seattle via 520 (WB PM)"
});
