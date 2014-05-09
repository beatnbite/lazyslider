<?php

/**
 * @file
 * Generate configuration form and save settings.
 */

/**
 * Configuration form for slider options.
 */
function lazyslider_option_configuration_form($form, &$form_state) {

  // Display image style settings if the image module is available
  if (module_exists('image') == TRUE) {

    foreach (image_styles() as $style => $properties) {
      $available_image_styles[$style] = $properties['name'];
    }

    $form['lazyslider_image_style'] = array(
      '#type' => 'checkbox',
      '#title' => t('Use image styles to generate slider images'),
      '#default_value' => variable_get('lazyslider_image_style', 0),
      '#description' => t('Easily modify, scale, crop and apply various effects to slider images using <a href="@image-styles">Image styles</a>.', array('@image-styles' => '/admin/config/media/image-styles')),
    );
    $form['lazyslider_image_style_slide'] = array(
      '#type' => 'select',
      '#title' => t('Slide image style'),
      '#options' => $available_image_styles,
      '#default_value' => variable_get('lazyslider_image_style_slide', 'large'),
      '#description' => t('Select an image style to apply to slide images.'),
      '#states' => array(
        'visible' => array(
          ':input[name="lazyslider_image_style"]' => array('checked' => TRUE),
        ),
      ),
    );
  }

  $form['lazyslider_animation_speed'] = array(
    '#type' => 'textfield',
    '#title' => t('Animation speed'),
    '#maxlength' => 6,
    '#size' => 6,
    '#default_value' => variable_get('lazyslider_animation_speed', '700'),
    '#description' => t('Enter a time in milliseconds. The animation speed determines how long it takes to transition from one slide to the next.'),
    '#field_suffix' => t('ms'),
  );
  $form['lazyslider_animation_delay'] = array(
    '#type' => 'textfield',
    '#title' => t('Pause between slides'),
    '#maxlength' => 6,
    '#size' => 6,
    '#default_value' => variable_get('lazyslider_animation_delay', '5000'),
    '#description' => t('Enter a time in milliseconds. The pause time determines how long each slide is displayed before transitioning to the next slide.'),
    '#field_suffix' => t('ms'),
  );
  $form['lazyslider_caption_speed'] = array(
    '#type' => 'textfield',
    '#title' => t('Caption animation speed'),
    '#maxlength' => 6,
    '#size' => 6,
    '#default_value' => variable_get('lazyslider_caption_speed', '250'),
    '#description' => t('Enter a time in milliseconds. The animation speed determines how long it takes to show the entire slide caption.'),
    '#field_suffix' => t('ms'),
  );
  $form['lazyslider_caption_delay'] = array(
    '#type' => 'textfield',
    '#title' => t('Caption collapse delay'),
    '#maxlength' => 6,
    '#size' => 6,
    '#default_value' => variable_get('lazyslider_caption_delay', '5000'),
    '#description' => t('Enter a time in milliseconds. The delay determines how long the caption is displayed before collapsed after the cursor moves out of the slide.'),
    '#field_suffix' => t('ms'),
  );

  return system_settings_form($form);
}
