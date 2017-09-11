const fs = require('fs')
const cheerio = require('cheerio')
const gulp = require('gulp')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin')
const rimraf = require('gulp-rimraf')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const webserver = require('gulp-webserver')
const uglify = require('gulp-uglify')
const unzip = require('gulp-unzip')
const zip = require('gulp-zip')
const babel = require('gulp-babel')

const excludeMin = []
const config = { js: [] }

gulp.task('build', ['initbuild', 'jsmin', 'addjs', 'copy', 'zip', 'unzip', 'clean', 'report'])

gulp.task('serve', function () {
  gulp.src('./src')
    .pipe(webserver({
      livereload: true,
      host: 'localhost',
      port: 8013,
      open: true
    }))
})

// Cleanup build files
// Create list of js files
gulp.task('initbuild', function () {
  let html = []
  let $ = []
  let src = []
  let js = []

  // delete prev files
  gulp.src('game.zip').pipe(rimraf())

  gulp.src('g.js').pipe(rimraf())

  gulp.src('index.html').pipe(rimraf())

  // get a list of all js scripts from our dev file
  html = fs.readFileSync('src/dev.html', 'utf-8', function (e, data) {
    return data
  })

  $ = cheerio.load(html)

  $('script').each(function () {
    src = $(this).attr('src')
    if (excludeMin.indexOf(src) === -1) {
      js.push(`src/${src}`)
    }
  })

  config.js = js
  console.log(js)
})

gulp.task('jsmin', ['initbuild'], function () {
  var stream = gulp.src(config.js)
    .pipe(babel({presets: ['env']}))
    .pipe(concat('g.js'))
    .pipe(uglify())
    .pipe(gulp.dest('.'))

  return stream
})

gulp.task('addjs', ['jsmin'], function () {
  var js = fs.readFileSync('g.js', 'utf-8', function (e, data) {
    return data
  })

  let i
  let extraJS = ''

  for (i = 0; i < excludeMin.length; i += 1) {
    console.log(excludeMin[i])
    extraJS += fs.readFileSync(excludeMin[i], 'utf-8', function (e, data) {
      return data
    })
  }
  // console.log(extraJS.length, 'OK', excludeMin)

  var stream = gulp.src('src/dev.html')
      .pipe(replace(/<.*?script.*?>.*?<\/.*?script.*?>/igm, ''))
      .pipe(replace(/<\/body>/igm, '<script>' + extraJS + ' ' + js + '</script></body>'))
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(rename('index.html'))
      .pipe(gulp.dest('./tmp'))

  return stream
})

gulp.task('copy', function () {
  var stream = gulp.src('index.html')
    .pipe(gulp.dest('dist/'))

  return stream
})

gulp.task('zip', ['addjs'], function () {
  var stream = gulp.src('tmp/index.html')
      .pipe(zip('game.zip'))
      .pipe(gulp.dest('.'))

  return stream
})

gulp.task('unzip', ['zip'], function () {
  var stream = gulp.src('game.zip')
      .pipe(unzip())
      .pipe(gulp.dest('.'))

  return stream
})

gulp.task('clean', ['unzip'], function () {
  var stream = gulp.src('tmp/').pipe(rimraf())

  return stream
})

gulp.task('report', ['clean'], function () {
  const stat = fs.statSync('game.zip')
  const limit = 1024 * 13
  const size = stat.size
  const remaining = limit - size
  const percentage = (size / limit) * 100

  const usedKb = stat.size / 1024
  const usedBar = '#'.repeat(Math.ceil(usedKb * 2))

  const remKb = remaining / 1024
  const remBar = '-'.repeat(Math.ceil(remKb * 2))

  console.log(`
  [${usedBar}${remBar}]
  ${usedKb.toFixed(2)}KB of 13KB used
  (${percentage.toFixed(2)}%)
  `)
})

gulp.task('encode', function () {
  const files = fs.readdirSync('./a')
  let gifs = []
  let n
  let parts
  let base64

  for (n in files) {
    if (files[n].indexOf('.gif') !== -1) {
      gifs.push(files[n])
    }
  }

  for (n = 0; n < gifs.length; n += 1) {
    fs.readFileSync('.a/' + gifs[n], function (err, data) {
      console.log(err, data)
    })
    parts = gifs[n].split('.')
    console.log(parts[0], gifs[n], base64)
  }
})
