module.exports = function (grunt, projectConfig) {

    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);


    // configurable paths
    var projectConfig = projectConfig != undefined ? projectConfig : {
        dev: 'app',
        release: 'dist',
        bin: 'node_modules/.bin',
        hosts: {
          local: '0.0.0.0'
        },
        ports: {
            dev: 8064,
            test: 8065
        }
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
            },
            jasmine:{
                files: ['<%= project.dev %>/**/*.js', '!<%= project.dev %>/vendor/**/*.js'],
                tasks: 'test'
            }


        },


        connect: {
            options: {
                // change this to '0.0.0.0' to access the server from outside
                hostname: projectConfig.hosts.local
            },
            test: {
                options: {
                    port: projectConfig.ports.test,
                    base: ''

                }
            },
            dev: {
                options: {
                    base: '',
                    port: projectConfig.ports.dev,
                    keepalive: true
                }
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

        jasmine: {
            bdd_testing: {
                src: ['<%= project.dev %>/test/src/*.js','<%= project.dev %>/*.js','<%= project.dev %>/environments/**/*.js',
                    '<%= project.dev %>/models/**/*.js','<%= project.dev %>/routers/**/*.js'],
                options: {
                    specs: '<%= project.dev %>/test/spec/*.js',
                    host: 'http://<%= project.hosts.local %>:<%= project.ports.test %>',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: '<%= project.dev %>/main.js',
                        requireConfig: {
                            baseUrl:  '<%= project.dev %>/'
                        }
                    }
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

    grunt.registerTask('build', ['shell:bower' , 'emberTemplates' ,  'compass' , 'clean:dist' , 'copy:dist' , 'requirejs:compile' , 'cssmin:minify']);

    grunt.registerTask('server:dev', ['connect:dev']);   //'jasmine:bdd_testing'
    grunt.registerTask('server:test', ['connect:test']);   //'jasmine:bdd_testing'


    grunt.registerTask('test', ['connect:test', 'jasmine:bdd_testing']);   //'jasmine:bdd_testing'
};