
let mix = require('laravel-mix');

mix.setPublicPath('./')
    .sass('assets/scss/popup.scss', 'dist/css')
    .js('assets/js/background.js', 'dist/js')
    .js('assets/js/popup.js','dist/js').vue()
    .options({
        processCssUrls: false
    }); 