define(['ember', 'routers/routes/root'], function(Ember, App, root){

    var Router = Ember.Router.extend({
        hello: "hello Main",
        enableLogging: true,
        root: root
    });

    return Router;
});