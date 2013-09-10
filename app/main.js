require.config({

    // Define some paths, could instead have local copies of all the CDN stuff
    paths: {
        jquery: 'vendor/jquery/jquery',
        Handlebars: 'vendor/handlebars/handlebars',
        ember: 'vendor/ember/ember',
        DS: 'vendor/ember-data-shim/ember-data',
        Swag: 'vendor/swag/lib/swag'
    },

    // shim non-amd globals
    shim: {
        ember: {
            deps: ['Handlebars', 'jquery'],
            exports: 'Ember'
        },
        DS: {
            deps: ['ember'],
            exports: 'DS'
        },
        Swag: {
            deps: ['Handlebars', 'jquery'],
            exports: 'Swag'
        }
    }
});



define([ 'router' , 'templates'  ], function(  router ){

});