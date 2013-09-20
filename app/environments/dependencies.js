define(['ember', 'app' , 'underscore' , 'model/rest' , 'model/fixture'],
    function (Ember, App, _ , restAdapter , fixtureAdapter ) {

        var locator = App.get("locator"),
            injections = {},
            envInjections = {},
            env = "default",
            globalModule = window;

        env = (globalModule.AppEnv) ? globalModule.AppEnv : env;

        switch (env) {
            case "test":
                envInjections = {
                    dbAdapter: fixtureAdapter
                }

                require(['model/data/fixtures'])

                break;

            default:
                envInjections = {
                    dbAdapter: restAdapter
                }
                break;
        }

        _.extend(injections, envInjections);


        for (injectionIndex in injections) {
            locator.set(injectionIndex, injections[injectionIndex]);
        }

        return locator;

    });