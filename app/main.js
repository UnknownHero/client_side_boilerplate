require.config({

    paths: {
        jquery: 'vendor/jquery/jquery',
        Handlebars: 'vendor/handlebars/handlebars',
        ember: 'vendor/ember/ember',
        DS: 'vendor/ember-data-shim/ember-data',
        Swag: 'vendor/swag/lib/swag',
        underscore: 'vendor/underscore/underscore'
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
        },
        underscore: {
            exports: '_'
        }
    }
});



define(  [  'run' , 'templates'  ], function(  router ){

});