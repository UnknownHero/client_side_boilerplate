define(['ember', 'routers/routes/root'], function(Ember, App, root){

    var Router = Ember.Router.extend({
        enableLogging: true,
        root: root
    });

    return Router;
});