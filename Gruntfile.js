module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Watch //
        watch: {
            js: {
                files: ['build/js/*.js'],
                tasks: ['js'],
                options: {
                    spawn: false,
                    interupt: true,
                },
            },
            styles: {
                files: ['build/css/*.css'],
                tasks: ['styles'],
                options: {
                    spawn: false,
                    interupt: true,
                },
            },
            img: {
                files: ['build/img/*'],
                tasks: ['images'],
                options: {
                    spawn: false,
                    interupt: true,
                },
            },
            html: {
                files: ['build/*.html'],
                tasks: ['html'],
                options: {
                    spawn: false,
                    interupt: true,
                },
            },
        },

        // JS //
        uglify: {
            build: {
                src: ['build/js/libs/*.js', 'build/js/*.js'],
                dest: 'dist/js/main.min.js'
            }
        },

        // CSS //
        cssmin: {
            dist: {
                files: {
                    'dist/css/index.css': ['build/css/*.css']
                }
            }
        },
        autoprefixer: {
            autoprefix: {
                expand: true,
                flatten: true,
                src: 'dist/css/index.css',
                dest: 'dist/css/',
            },
        },

        // Images //
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'build/img',
                    src: ['**'],
                    dest: 'dist/img'
                }]
            },
            // svgs: {
            //     files: [{
            //         expand: true,
            //         cwd: 'build/img',
            //         src: ['**'],
            //         dest: 'dist/img'
            //     }]
            // }
        },
        imageoptim: {
            myTask: {
                options: {
                    jpegMini: false,
                    imageAlpha: false,
                    quitAfter: true
                },
                src: ['dist/img']
            }
        },

        // HTML //
        htmlmin: {
            main: {
                options: { // Target options
                    removeComments: false,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: { // Dictionary of files
                    'dist/index.html': 'build/index.html' // 'destination': 'source'
                        // 'dist/contact.html': 'src/contact.html'
                }
            }
        },

        // Host //
        browserSync: {
            dev: {
                bsFiles: {
                    src: ['dist/css/*.css', 'dist/*.html', 'dist/js/*.js', 'dist/img/**']
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "dist"
                    }
                }
            },
            host: {
                bsFiles: {
                    src: ['dist/css/*.min.css', 'dist/*.html', 'dist/js/*.js', 'dist/img/**']
                },
                options: {
                    watchTask: false,
                    server: {
                        baseDir: "dist"
                    }
                }
            }
        },
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-imageoptim');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-copy');


    // Tasks
    grunt.registerTask('default', ['js', 'styles', 'images', 'html']);

    grunt.registerTask('js', ['uglify']);
    grunt.registerTask('styles', ['cssmin', 'autoprefixer']);
    grunt.registerTask('images', ['newer:copy:main', 'newer:imageoptim:myTask']);
    grunt.registerTask('html', ['htmlmin']);

    grunt.registerTask('serve', ['browserSync:dev', 'watch']);
    grunt.registerTask('host', 'browserSync:host');


};
