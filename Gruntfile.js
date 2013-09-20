module.exports = function (grunt, projectConfig) {

    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);


    // configurable paths
    var projectConfig = projectConfig != undefined ? projectConfig : {
        dev: 'app',
        release: 'dist',
        bin: 'node_modules/.bin'
    };

    grunt.initConfig({

        project: projectConfig,

        watch: {
            emberTemplates: {
                files: ['<%= project.dev %>/**/*.hbs'],
                tasks: ['emberTemplates']
            },
            compass: {
                files: ['<%= project.dev %>/**/*.{scss,sass}'],
                tasks: ['compass']
            }
        },

        shell: {
            bower: {
                command: 'nodejs <%= project.bin %>/bower install --force',
                options: {
                    stdout: true
                }
            }
        },


        requirejs: {
            compile: {
                options: {
                    baseUrl: "<%= project.dev %>",
                    mainConfigFile: "<%= project.dev %>/main.js",
                    out: "<%= project.release %>/main.js",
                    optimize: "uglify2",
                    name: 'main'
                }
            } ,

            css : {
                dir: "<%= project.release %>"
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= project.release %>/*',
                        '!<%= project.release %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        compass: {
            options: {

                sassDir: '<%= project.dev %>/style',
                cssDir: '<%= project.dev %>/css',
                generatedImagesDir: '<%= project.dev %>/images/generated',
                imagesDir: '<%= project.dev %>/images',
                fontsDir: '<%= project.dev %>/css/fonts',
                importPath: 'app/vendor',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/css/fonts',
                relativeAssets: false
            },
            compile: {
                options: {
                    debugInfo: true
                }
            }

        },


        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= project.dev %>/',
                        dest: '<%= project.release %>/',
                        src: [
                            '**',
                        ]
                    }
                ]
            }
        },

        cssmin: {
            minify: {
                dot: true,
                expand: true,
                cwd: '<%= project.dev %>',
                src: ['*.css'],
                dest: '<%= project.release %>'
            }
        },

        emberTemplates: {
            compile: {
                options: {
                    amd: true,
                    templateBasePath: '<%= project.dev %>'
                },
                files: {
                    "<%= project.dev %>/templates.js": "<%= project.dev %>/**/*.hbs"
                }
            }
        }


    });

    grunt.registerTask('dev', function (target) {

        grunt.task.run([
            'watch'
        ]);

    });

    grunt.registerTask('build', ['shell:bower' , 'emberTemplates' ,  'compass' , 'clean:dist' , 'copy:dist' , 'requirejs:compile' , 'cssmin:minify']);         // ,
};