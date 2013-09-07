module.exports = function (grunt,projectConfig) {

    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);


    // configurable paths
    var projectConfig = projectConfig != undefined ? projectConfig : {
        dev: 'app',
        release: 'release',
        bin: 'node_modules/.bin'
    };

    grunt.initConfig({

        project: projectConfig,

        shell: {
            bower: {
                command: 'nodejs <%= project.bin %>/bower install',
                options: {
                    stdout: true
                }
            }
        }


    });

    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('build', ['shell:bower']);

};