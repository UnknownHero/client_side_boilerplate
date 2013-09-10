define(['ember', 'app', 'environments/dependencies' , 'routers/main'], function(Ember, App ,deps , router){
        var locator =   App.get("locator");

        App.Router = router;
        App.ApplicationAdapter = locator.get("dbAdapter");

        App.advanceReadiness();
});