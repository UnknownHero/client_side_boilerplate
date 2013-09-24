define(['ember', 'app', 'environments/dependencies' , 'routers/main'], function (Ember, App, deps, router) {
    var locator = App.get("locator");

    if (locator.get("appRun") == true) {

        App.Router = router;
        App.ApplicationAdapter = locator.get("dbAdapter");

        App.advanceReadiness();

    }

});