define(['ember', 'app' , 'underscore' , 'model/rest' , 'model/fixture'],
    function (Ember, App, _ , restAdapter , fixtureAdapter ) {

        var locator = App.get("locator"),
            injections = {},
            env = "default",
            globalModule = window,
            envInjections = {

                dbAdapter: null,
                appRun: true

            };

        env = (globalModule.AppEnv) ? globalModule.AppEnv : env;

        switch (env) {
            case "test":
                envInjections = {
                    dbAdapter: fixtureAdapter,
                    appRun: false
                }

                require(['model/data/fixtures'])

                break;

            default:
                envInjections = {
                    dbAdapter: restAdapter,
                    appRun: true
                }
                break;
        }

        _.extend(injections, envInjections);


        for (injectionIndex in injections) {
            locator.set(injectionIndex, injections[injectionIndex]);
        }

        return locator;

    });