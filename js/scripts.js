//backbone model
var RouteModel = Backbone.Model.extend({
    defaults:{
        Description: null,
        AverageTime: null,
        CurrentTime: null,
        Distance: null,
        EndPoint: null,
        Name: null,
        StartPoint: null,
        TimeUpdated: null,
        TravelTimeID: null,
    }
});

//backbone collection
var RouteCollection = Backbone.Collection.extend({
    model: RouteModel,
    url: "http://wsdot.com/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson?AccessCode=e901f9a2-936d-49fb-90a7-304f89fb5431"
});

//model view
var RouteView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#RouteTemplate').html()),
    initialize: function(){
        this.render();
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});


//collection view
var RouteListView = Backbone.View.extend({
    el: '#output',
    render: function(){
        this.$el.empty();
        this.collection.each(function(route){
            var routeView = new RouteView({model: route});
            this.$el.append(routeView.render().$el);
          }, this);
          return this;
    },
    initialize: function(){
        this.listenTo(this.collection, 'sync', this.render);        
    }
});

var TrafficRouter = Backbone.Router.extend({
    routes: {
      'traffic': 'renderTraffic',
      '*default': 'renderTraffic'
    },
    renderTraffic: function(){
        routes.fetch()
    }
});


// instantiate a collection
var routes = new RouteCollection();
// routes = _.sortBy(routes, 'Description');


// instantiate a collectionView
var routesView = new RouteListView({collection: routes});
var TRouter = new TrafficRouter();
Backbone.history.start();
