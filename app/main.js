require.config({

    // Define some paths, could instead have local copies of all the CDN stuff
    paths: {
        jquery: 'vendor/jquery/jquery',
        Handlebars: 'vendor/handlebars/handlebars',
        //Ember: 'http://cdnjs.cloudflare.com/ajax/libs/ember.js/1.0.0-pre.2/ember-1.0.0-pre.2',
        Ember: 'vendor/ember/ember',
        DS: 'vendor/ember-data-shim/ember-data',
        hbs: 'vendor/hbs'
    },

    // shim non-amd globals
    shim: {
        Ember: {
            deps: ['Handlebars', 'jquery'],
            exports: 'Ember'
        },
        DS: {
            deps: ['Ember'],
            exports: 'DS'
        }
    }
});
