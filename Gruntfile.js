/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      build: {
        src: ['bower_components/jquery/dist/jquery.js','src/scripts/*.js'],
        dest: 'src/scripts/concatenated/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      build: {
        files: {
          'dist/scripts/<%= pkg.name %>.min.js': ['<%= concat.build.dest %>']
        }
      }
    },
    jshint: {
      options: {
        reporter: (require('jshint-stylish')).toString(),
        asi: true,
        expr:true

      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      custom_scripts: {
        src: 'src/scripts/*.js'
      }
    },
    less: {
      options: {
        paths: ["assets/css"]
      },
      build: {
        files: {
          'src/styles/bootstrap_modified.css': ['src/styles/less/bootstrapmods.less']
        }
      }
    },
    concat_css: {
      all: {
        src: ["src/styles/*.css"],
        dest: "src/styles/concatenated/styles.css"
      }
    },
    cssmin: {
      options: {
        keepSpecialComments : 0
      },
      minify: {
        files: {
          'dist/styles/<%= pkg.name %>.min.css': ['src/styles/concatenated/styles.css']
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 3000,
          hostname: 'localhost',
          base: 'dist',
          livereload:true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      scripts: {
        files: ['src/scripts/*.js'],
        tasks: ['jshint:custom_scripts', 'concat', 'uglify']
      },
      styles: {
        files: ['src/styles/*.css','src/styles/less/*.less'], 
        tasks: ['less','concat_css','cssmin']
      },
      html: {
        files: 'dist/index.html',
        options: {
          livereload: true
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');


  // Default task.
  grunt.registerTask('default', ['jshint:gruntfile', 'concat', 'uglify', 'less' , 'concat_css', 'cssmin', 'connect', 'watch']);

  grunt.registerTask('alltasks', ['jshint', 'concat', 'uglify', 'less' , 'concat_css', 'cssmin', 'connect']);
};
