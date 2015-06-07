// Gulp.js configuration

// include gulp and plugins
var
	gulp = require('gulp'),
  newer = require('gulp-newer'),
	concat = require('gulp-concat'),
	htmlclean = require('gulp-htmlclean'),
  htmlmin = require('gulp-htmlmin'),
	image = require('gulp-image'),
	pleeease = require('gulp-pleeease'),
	jshint = require('gulp-jshint'),
  preprocess = require('gulp-preprocess'),
	stripdebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),
	size = require('gulp-size'),
	del = require('del'),
	pkg = require('./package.json');


  // file locations
  var
  	devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),

  	source = 'source/',
  	dest = 'build/',

    html =
        {
          in: source + '*.html',
          watch: [source + '*.html'],
          out: dest,
          context:
            {
              devBuild: devBuild,
            }
        },

    views_html =
        {
          in: source + 'views/' + '*.html',
          watch: [source + 'views/' + '*.html'],
          out: dest + 'views/',
          context:
            {
              devBuild: devBuild,
            }
        },

    images =
      {
        in: source + 'img/*.*',
      	out: dest + 'img/'
      },

    views_images =
      {
        in: source + 'views/images/*.*',
        out: dest + 'views/images/'
      },

      //css files
    css =
      {
        in: source + 'css/*.css',
      	watch: [source + 'css/**/*'],
      	out: dest + 'css/',
    		pleeeaseOpts:
          {
      			autoprefixer: { browsers: ['last 2 versions', '> 2%'] },
      			rem: ['16px'],
      			pseudoElements: true,
      			mqpacker: true,
      			minifier: !devBuild
      		 }
      	},

    views_css =
      {
        in: source + 'views/css/*.css',
      	watch: [source + 'views/css/**/*'],
      	out: dest + 'views/css/',
    		pleeeaseOpts:
          {
      			autoprefixer: { browsers: ['last 2 versions', '> 2%'] },
      			rem: ['16px'],
      			pseudoElements: true,
      			mqpacker: true,
      			minifier: !devBuild
      		}
      	},




      	// fonts = {
      	// 	in: source + 'fonts/*.*',
      	// 	out: css.out + 'fonts/'
      	// },

    js =
      {
        in: source + 'js/*.*',
      	out: dest + 'js/',
      },

    views_js =
        {
          in: source + 'views/js/*.*',
          out: dest + 'views/js/',
        },

		replace_pics_img =
				{

					in: '/Users/paulandcindy/Documents/test_images/img/' + '*',
					out: dest + 'img/',

				},

		replace_pics_images =
				{
					in: '/Users/paulandcindy/Documents/test_images/images/' + '*',
					out: dest + 'views/'+'images/',
				};





      	// syncOpts = {
      	// 	server: {
      	// 		baseDir: dest,
      	// 		index: 'index.html'
      	// 	},
      	// 	open: false,
      	// 	notify: true
      	// };

      // show build type
      console.log(pkg.name + ' ' + pkg.version + ', ' + (devBuild ? 'development' : 'production') + ' build');

      // clean the build folder
      gulp.task('clean', function() {
      	del([
      		dest + '*'
      	]);
      });

	//

	//clean the img folder and transfer the finished pictures to the build folders
		gulp.task('replace_pics1', function() {
		del([
			dest + "img/" + '*'
		]);
		return gulp.src(replace_pics_img.in)
			.pipe(gulp.dest(replace_pics_img.out))
	});
	//clean the views/images folder and transfer the finished pictures to the build folders
		gulp.task('replace_pics2', function() {
		del([
			dest + "views/" +"images/" + '*'
		]);
		return gulp.src(replace_pics_images.in)
			.pipe(gulp.dest(replace_pics_images.out))
	});

	gulp.task('replace', ['replace_pics1', 'replace_pics2'], function() {
		return;
	});



	//


      // build HTML files
      gulp.task('html', function() {
      	var page = gulp.src(html.in).pipe(preprocess({ context: html.context }));
      	if (!devBuild) {
      		page = page
      			.pipe(size({ title: 'HTML in' }))
      			.pipe(htmlmin({collapseWhitespace: true}))
      			.pipe(size({ title: 'HTML out' }));
      	}
      	return page.pipe(gulp.dest(html.out));
      });
      // build views_html files
      gulp.task('views_html', function() {
      	var page = gulp.src(views_html.in).pipe(preprocess({ context: views_html.context }));
      	if (!devBuild) {
      		page = page
      			.pipe(size({ title: 'views_html in' }))
      			.pipe(htmlmin({collapseWhitespace: true}))
      			.pipe(size({ title: 'views_html out' }));
      	}
      	return page.pipe(gulp.dest(views_html.out));
      });

    //   gulp.task('default', function () {
    // return gulp.src('src/images/*')
    //     .pipe(imagemin({
    //         progressive: true,
    //         svgoPlugins: [{removeViewBox: false}],
    //         use: [pngquant()]
    //     }))
    //





      // manage images
      gulp.task('images', function()
      {
      	return gulp.src(images.in)
      		.pipe(newer(images.out))
          .pipe(image())
      		.pipe(gulp.dest(images.out));
      });
      // manage views_images
      gulp.task('views_images', function() {
      	return gulp.src(views_images.in)
      		.pipe(newer(views_images.out))
          .pipe(image())
      		.pipe(gulp.dest(views_images.out));
      });


      // // copy fonts
      // gulp.task('fonts', function() {
      // 	return gulp.src(fonts.in)
      // 		.pipe(newer(fonts.out))
      // 		.pipe(gulp.dest(fonts.out));
      // });


      // compile css
      gulp.task('css',  function() {
      	return gulp.src(css.in)
      		.pipe(size({title: 'CSS in '}))
      		.pipe(pleeease(css.pleeeaseOpts))
      		.pipe(size({title: 'CSS out '}))
      		.pipe(gulp.dest(css.out));
      });
      // compile views_css
      gulp.task('views_css',  function() {
      	return gulp.src(views_css.in)
      		.pipe(size({title: 'views_css in '}))
      		.pipe(pleeease(views_css.pleeeaseOpts))
      		.pipe(size({title: 'views_css out '}))
      		.pipe(gulp.dest(views_css.out));
      });
      gulp.task('js', function() {
      	if (devBuild) {
      		return gulp.src(js.in)
      			.pipe(newer(js.out))
      			// .pipe(jshint())
      			// .pipe(jshint.reporter('default'))
      			// .pipe(jshint.reporter('fail'))
      			.pipe(gulp.dest(js.out));
      	}
      	else {
      		del([
      			dest + 'js/*'
      		]);
      		return gulp.src(js.in)
      			.pipe(size({ title: 'JS in '}))
      			.pipe(stripdebug())
      			.pipe(uglify())
      			.pipe(size({ title: 'JS out '}))
      			.pipe(gulp.dest(js.out));
      	}
      });

      gulp.task('views_js', function() {
        if (devBuild) {
          return gulp.src(views_js.in)
            .pipe(newer(views_js.out))
            // .pipe(jshint())
            // .pipe(jshint.reporter('default'))
            // .pipe(jshint.reporter('fail'))
            .pipe(gulp.dest(views_js.out));
        }
        else {
          del([
            dest + 'views/js/*'
          ]);
          return gulp.src(views_js.in)
            .pipe(size({ title: 'views_js in '}))
            .pipe(stripdebug())
            .pipe(uglify())
            .pipe(size({ title: 'views_js out '}))
            .pipe(gulp.dest(views_js.out));
        }
      });



      // default task
      gulp.task('default', ['html', 'views_html','images','views_images','css','views_css', 'js','views_js'], function() {

      	// html changes
      	gulp.watch(html.watch, ['html']);
        gulp.watch(views_html.watch, ['views_html']);

      	// // image changes
      	// gulp.watch(images.in, ['images']);
        // gulp.watch(views_images.in, ['views_images']);


      	// css changes
      	gulp.watch([css.watch], ['css']);
        gulp.watch([views_css.watch], ['views_css']);
      	// javascript changes
      	gulp.watch(js.in, ['js']);
        gulp.watch(views_js.in, ['views_js']);      });
