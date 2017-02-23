module.exports = function(grunt) {
  
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
      options: { separator: ';' },
      
      //js: {
      //  src: [],
      //  dest: 'dest.js'
      //},
      
      vendor: {
        src: [
			"public/javascripts/vendor/jquery-1.10.2.js",
			"public/javascripts/vendor/bootstrap.js",
			"public/javascripts/vendor/angular.min.js",
			"public/javascripts/vendor/ui-bootstrap-0.12.0.min.js",
			"public/javascripts/vendor/angular-ui-router.js",
			"public/javascripts/vendor/slick.js",
			"public/javascripts/vendor/loading-bar.min.js",
            "public/javascripts/vendor/moment.min.js",
			"public/javascripts/vendor/ngStorage.min.js",
			"public/javascripts/vendor/ngFacebook.js",
			"public/javascripts/vendor/angular-slick.js",
			"public/javascripts/vendor/ng-file-upload.js",
			"public/javascripts/vendor/angular-animate.min.js",
			"public/javascripts/vendor/angular-aria.min.js",
			"public/javascripts/vendor/angular-messages.min.js",
			"public/javascripts/vendor/angular-material.min.js",
            "public/javascripts/vendor/angular-moment.min.js"
		],
        dest: 'public/javascripts/vendor/vendor.min.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.author %><%= grunt.template.today("dd-mm-yyyy") %> */\n',
        mangle: false
      },
      js: {
        files: {
          'public/javascripts/main.min.js': ['public/javascripts/main.js']
        }
      },
      vendor: {
        files: { 'public/javascripts/vendor/vendor.min.js': ['public/javascripts/vendor/vendor.js'] }
      }
    },

    cssmin: {
      target: {
        files: { "public/stylesheets/style.min.css": [
				"public/stylesheets/bootstrap/bootstrap.min.css",
				"public/stylesheets/slick.css",
				"public/stylesheets/font-awesome.css",
				"public/stylesheets/angular-material.min.css",
				"public/stylesheets/loading-bar.min.css",
				"public/stylesheets/style.css"
			]}
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('build', [ 'concat','uglify','cssmin']);
};