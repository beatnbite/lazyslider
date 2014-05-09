/**
 * @file
 * Attaches the behaviors for the Lazy Slider module.
 */

(function ($) {
  Drupal.behaviors.lazySlider = {
    attach: function (context, settings) {
      $('#slider').lazySlider({
        animationSpeed: parseInt(Drupal.settings.lazyslider.animation_speed),
        animationDelay: parseInt(Drupal.settings.lazyslider.animation_delay),
        captionAnimationSpeed: parseInt(Drupal.settings.lazyslider.caption_speed),
        captionAnimationDelay: parseInt(Drupal.settings.lazyslider.caption_delay)
      });
    }
  };
}(jQuery));