module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['node_modules/foundation-sites/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true,
        },
        files: {
          'public/css/style.css': 'src/scss/style.scss'
        }
      }
    },

    concat: {
      options: {
        //separator: grunt.util.linefeed + ';' + grunt.util.linefeed,
      },
      dist: {
        src: [
          //"node_modules/foundation-sites/node_modules/what-input/what-input.min.js",
          "node_modules/foundation-sites/node_modules/jquery/dist/jquery.min.js",
          "node_modules/foundation-sites/dist/foundation.min.js",
          "src/js/chat.min.js"
        ],
        dest: 'public/js/chat.js',
      },
    },

    jshint:{
      files: ['Gruntfile.js', 'server.js', 'src/js/chat.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js']
      },

      sass: {
        files: ['src/scss/**/*.scss', 'src/js/**/*.js'],
        tasks: ['sass', 'concat', 'jshint']
      }
    },

    uglify: {
      options: {
        //mangleProperties: true,
        reserveDOMCache: true
      },
      my_target: {
        files: {
          'src/js/chat.min.js': ['src/js/chat.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('build', ['sass', 'jshint', 'uglify', 'concat', 'mochaTest']);
  grunt.registerTask('default', ['build','watch']);
};
