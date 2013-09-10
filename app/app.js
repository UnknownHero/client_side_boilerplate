
define(['ember', 'routers/main'], function(Ember , main){

    window.App = Ember.Application.create({
        // since we're loading modules async, we don't want ember to do its
        // autoinit magic, we'll initialize ourselves in main.js when we
        // know for sure all of our routes and modules are attached to the
        // the application object
        autoinit: false,
        locator: Ember.Object.create({})
    });




    return window.App;
});


