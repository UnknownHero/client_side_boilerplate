define(['ember', 'app' , 'underscore',
'routers/main','routers/denied'
],
    function(Ember, App , _ ,
      routers_main , routers_denied
    ){

    var locator = App.get("locator"),
        injections = {},
        envInjections = {},
        env = "default",
        globalModule = window;

    env = (globalModule.AppEnv) ? globalModule.AppEnv : env;

    switch (env) {
        case "ie":
            envInjections = {
                baseRouter: routers_denied
            }
        break;

        default:
            envInjections = {
                baseRouter: routers_main
            }
            break;
    }

    _.extend(injections,envInjections);


    for(injectionIndex in injections){
        locator.set(injectionIndex , injections[injectionIndex]);
    }

});