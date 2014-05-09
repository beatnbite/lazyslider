/*
 * Lazy Slider v0.1
 * https://github.com/beatnbite/lazyslider
 *
 * Copyright 2014, Vyacheslav Petrov
 *
 * Free for non-commercial use.
 * A license fee is required for commercial use.
 * Please refer to LICENSE file for details.
 */

(function($) {

    /**
     * Instantiates and runs the lazy slider on the element matching the specified selector.
     *
     * @param selector jQuery selector to match the slider element on the page.
     * @param options  Slider options.
     *
     * @constructor
     */
    var LazySlider = function(selector, options) {

        /**
         * Slider settings.
         *
         * @type object
         */
        var settings = {
            animationSpeed: 700,
            animationDelay: 5000,
            easingOut: 'swing',
            easingIn: 'swing',
            captionAnimationSpeed: 250,
            captionAnimationDelay: 600
        };
        $.extend(settings, options);

        /**
         * The slider element.
         *
         * @type jQuery
         */
        var slider = $(selector);

        /**
         * Information on slides.
         *
         * @type Array
         */
        var slides = [];

        /**
         * The total number of slides.
         *
         * @type number
         */
        var total = 0;

        /**
         * Index of the current slide.
         *
         * @type number
         */
        var currentIndex = 0;

        /**
         * The current slide element.
         *
         * @type jQuery
         */
        var current;

        /**
         * Start the animation.
         */
        this.run = function () {

            // Init the slider

            init();

            // Start the caption animation

            var caption = $('.lazyslider-caption', slider);
            var panes = $('.lazyslider-panes', slider);

            panes.hover(function () {

                clearTimeout(panes.t);
                caption.stop().animate({bottom: 0}, settings.captionAnimationSpeed);

            }, function () {

                panes.t = setTimeout((function () {
                    var height = $('.lazyslider-description', caption).outerHeight();
                    caption.stop().animate({
                        bottom: "-" + height + "px"
                    }, settings.captionAnimationSpeed)
                }), settings.captionAnimationDelay);

            });

            // Update the caption with the first slide description

            updateCaption();

            // Show the first slide and run the animation

            schedule();
        };

        /**
         * Init the slider.
         */
        var init = function () {

            // Init the slider element

            slider.append(
                '<div class="lazyslider-panes">'
                + '<div class="lazyslider-first-pane lazyslider-pane"></div>'
                + '<div class="lazyslider-second-pane lazyslider-pane"></div>'
                + '<div class="lazyslider-caption"><div class="lazyslider-background"></div><div class="lazyslider-description"></div></div>'
                + '</div>'
            );

            slider.addClass('lazyslider');

            // Read information on slides

            $('.slide', slider).each(function (index) {
                var slide = $(this);
                var link = slide.data('link');
                slides[index] = {
                    url: slide.data('src'),
                    width: slide.data('width'),
                    height: slide.data('height'),
                    alt: $.trim(slide.text()),
                    slide: slide
                };
                if (link) {
                    slides[index].link = link;
                }
                total++;
            });
        };

        /**
         * Update the caption with the description of the current slide.
         */
        var updateCaption = function () {
            $('.lazyslider-description', slider).text(slides[currentIndex].alt);
        };

        /**
         * Prepare slides for the next animation step and schedule the animation.
         */
        var schedule = function () {
            prepare();
            setTimeout(animate, settings.animationDelay);
        };

        /**
         * Prepares slides for the next animation step.
         */
        var prepare = function () {

            $('.lazyslider-first-pane a, .lazyslider-first-pane img', slider).remove();
            $('.lazyslider-first-pane', slider).append(renderSlide(currentIndex));
            $('.lazyslider-first-pane', slider).show();

            currentIndex++;
            if (currentIndex >= total) {
                currentIndex = 0;
            }

            $('.lazyslider-second-pane', slider).hide();
            $('.lazyslider-second-pane a, .lazyslider-second-pane img', slider).remove();
            $('.lazyslider-second-pane', slider).append(renderSlide(currentIndex));
        };

        /**
         * Start the next animation step.
         */
        var animate = function () {
            updateCaption();
            $('.lazyslider-first-pane', slider).fadeOut({duration: settings.animationSpeed, easing: settings.easingOut});
            $('.lazyslider-second-pane', slider).fadeIn({duration: settings.animationSpeed, easing: settings.easingIn, complete: schedule});
        };

        /**
         * Render a slide.
         *
         * @param index Index of the slide to render.
         *
         * @returns string Slide HTML.
         */
        var renderSlide = function (index) {

            var banner = slides[index];

            var imageHtml = '<img src="'
                + banner.url
                + '" width="'
                + banner.width
                + '" height="'
                + banner.height
                + '" alt="'
                + banner.alt
                + '" />';

            return ('link' in banner) ? '<a href="' + banner.link + '">' + imageHtml + '</a>' : imageHtml;
        };

    };

    /**
     * Prototype jQuery and add the lazySlider method.
     *
     * @param options Slider settings
     *
     * @returns jQuery
     */
    $.fn.lazySlider = function(options) {
        return this.each(function(key, value){
            var slider = new LazySlider(this, options);
            slider.run();
        });
    };

})(jQuery);