// The application router
//
// This object is essentially a state machine, as the user navigates around the
// site, the objects required for each state are initialized, the views updated,
// and the url changes automatically.
//
// The syntax for routers is changing, see: https://gist.github.com/3981133

define(['ember', 'app', 'environments/dependencies'], function(Ember, App){
        var locator =   App.get("locator");

        App.Router = locator.get("baseRouter");
        console.log(App.Router.create().get("hello"));
});