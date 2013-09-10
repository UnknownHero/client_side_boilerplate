define(['ember', 'app', 'environments/dependencies' , 'routers/main'], function(Ember, App ,deps , router){
        var locator =   App.get("locator");

        App.Router = router;
        App.ApplicationAdapter = locator.get("dbAdapter");
        console.log( App.ApplicationAdapter);
        console.log(App.Router.create().get("hello"));
});