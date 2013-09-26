module.exports = function (grunt, projectConfig) {

    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

     var ports = require('./ports.json');
    // configurable paths
    var projectConfig = projectConfig != undefined ? projectConfig : {
        dev: 'app',
        release: 'dist',
        bin: 'node_modules/.bin',
        hosts: {
          local: '0.0.0.0'
        },
        ports: {
            dev: ports.dev,
            test: ports.test,
            live: ports.live
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
            dev_forever: {
                options: {
                    base: '',
                    port: projectConfig.ports.dev,
                    keepalive: true
                }
            },
            dev: {
                options: {
                    base: '',
                    port: projectConfig.ports.dev
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
                    '<%= project.dev %>/model/**/*.js','<%= project.dev %>/routers/**/*.js'],
                options: {
                    specs: '<%= project.dev %>/test/spec/*.js',
                    host: 'http://<%= project.hosts.local %>:<%= project.ports.test %>',
                    outfile: "run.html",
                    keepRunner: true,
                    junit: {
                        path: "result",
                        consolidate: true
                    },
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'result/coverage/coverage.json',
                        report: 'result/coverage',
                        template: require('grunt-template-jasmine-requirejs'),
                        templateOptions: {
                            requireConfigFile: '<%= project.dev %>/main.js',
                            requireConfig: {
                                baseUrl:  '.grunt/grunt-contrib-jasmine/<%= project.dev %>/'
                            }
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
                    name: 'main',
                    paths:{
                        requireLib: "vendor/requirejs/require"
                    },
                    include:"requireLib"
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

            unit_test_auto_runner:{

            }
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
            },

            unit_test_auto_runner: {
                files: [
                    {
                        expand: true,
                        cwd: '',
                        dest: 'result/unit/',
                        src: [
                            '<%= project.dev %>/test/**','.grunt/**','run.html'
                        ]
                    }
                ]
            },

            istanbul_vendor_fix: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= project.dev %>',
                        dest: '.grunt/grunt-contrib-jasmine/<%= project.dev %>',
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
            'connect:dev',
            'watch'
        ]);

    });

    grunt.registerTask('build', ['shell:bower' , 'emberTemplates' ,  'compass' , 'clean:dist' , 'copy:dist' , 'requirejs:compile' , 'cssmin:minify']);

    grunt.registerTask('server:dev', ['connect:dev_forever']);
    grunt.registerTask('server:test', ['connect:test']);

    grunt.registerTask('test', ['connect:test', 'copy:istanbul_vendor_fix' , 'jasmine:bdd_testing' , 'copy:unit_test_auto_runner']);
};