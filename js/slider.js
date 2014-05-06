

jQuery(document).ready(function($) {

    var settings = {
        animationSpeed: 700,
        animationDelay: 6000,
        easingOut: 'swing',
        easingIn:  'swing',
        captionAnimationSpeed: 250,
        captionAnimationDelay: 600
    };

    var banners = [],
        total = 0,
        currentIndex = 0,
        slider = $('#slider'),
        current;

    // Init banners
    $('.slides .slide').each(function (index) {
        var slide = $(this);
        banners[index] = {
            url: slide.data('src'),
            width: slide.data('width'),
            height: slide.data('height'),
            alt: $.trim(slide.text()),
            slide: slide
        };
        total++;
    });

    // Init slider
    slider.append('<div class="slider-panes">'
        + '<div class="slider-first-pane slider-pane"></div>'
        + '<div class="slider-second-pane slider-pane"></div>'
        + '<div class="slider-caption"><div class="slider-background"></div><div class="slider-description"></div></div>'
        + '</div>');

    // Init caption
    var caption = $('.slider-caption', slider);
    var panes = $('.slider-panes', slider);
    panes.hover(function() {
        clearTimeout(panes.t);
        caption.stop().animate({bottom: 0}, settings.captionAnimationSpeed);
    }, function() {
        panes.t = setTimeout((function() {
            var height = $('.slider-description', caption).outerHeight();
            caption.stop().animate({
                bottom: "-" + height + "px"
            }, settings.captionAnimationSpeed)
        }), settings.captionAnimationDelay);
    });

    var renderSlide = function(index) {
        var banner = banners[index];
        return '<img src="'
            + banner.url
            + '" width="'
            + banner.width
            + '" height="'
            + banner.height
            + '" alt="'
            + banner.alt
            + '" />';
    };

    var prepareStep = function() {
        $('.slider-first-pane img', slider).remove();
        $('.slider-first-pane', slider).append(renderSlide(currentIndex));
        $('.slider-first-pane', slider).show();

        currentIndex++;
        if (currentIndex >= total) {
            currentIndex = 0;
        }

        $('.slider-second-pane', slider).hide();
        $('.slider-second-pane img', slider).remove();
        $('.slider-second-pane', slider).append(renderSlide(currentIndex));
    };

    var updateCaption = function() {
        $('.slider-caption .slider-description', slider).text(banners[currentIndex].alt);
    };

    var schedule = function() {
        prepareStep();
        setTimeout(animate, settings.animationDelay);
    };

    var animate = function()
    {
        updateCaption();
        $('.slider-first-pane', slider).fadeOut({duration: settings.animationSpeed, easing: settings.easingOut});
        $('.slider-second-pane', slider).fadeIn({duration: settings.animationSpeed, easing: settings.easingIn, complete: schedule});
    };

    updateCaption();
    schedule();
});