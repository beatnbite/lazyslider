<?php

/**
 * @file
 * Theme and preprocess functions for Nivo Slider.
 */

/**
 * Returns HTML for the slide configuration form into a table.
 *
 * @param $variables
 *   An associative array containing:
 *   - form: A render element representing the form.
 *
 * @ingroup themeable
 *
 * @return string
 */
function theme_lazyslider_slide_configuration_form($variables) {

  $form = $variables['form'];

  // Add the tableDrag JavaScript behavior
  drupal_add_tabledrag('lazyslider-slides', 'order', 'sibling', 'slide-weight');

  $rows = array();

  // Generate an array of table rows from the available slides
  foreach ($form['images'] as $slide => &$property) {

    if (is_numeric($slide)) {

      // Create an array to hold the table row for the current slide
      $row = array();

      // Add a column containing the slide's title to the current row
      $name = $property['name'];
      $row[] = array(
        'data' => drupal_render($name),
      );
      unset($property['name']);

      // Add a column containing the slide's weight to the current row
      $weight = $property['weight'];
      $row[] = array(
        'data' => drupal_render($weight),
      );
      unset($property['weight']);

      // Add a column containing the slide's weight to the current row
      $published = $property['published'];
      $row[] = array(
        'data' => drupal_render($published),
      );
      unset($property['published']);

      // Add a column containing the slide's weight to the current row
      $delete = $property['delete'];
      $row[] = array(
        'data' => drupal_render($delete),
      );
      unset($property['delete']);

      // Store the individual row
      $rows[] = array(
        'data' => $row,
        'class' => array('draggable'),
      );
    }
  }

  // Build the draggable table if any rows are available
  if (!empty($rows)) {
    // Create an array of table headers
    $headers = array(
      t('Name'),
      t('Weight'),
      t('Published'),
      t('Delete'),
    );

    // Over-write the 'order' form element with the draggable table
    $form['order'] = array(
      '#theme' => 'table',
      '#header' => $headers,
      '#rows' => $rows,
      '#attributes' => array(
        'id' => 'lazyslider-slides',
      ),
    );
  }

  return drupal_render_children($form);
}

/**
 * Implements template_preprocess_hook().
 */
function template_preprocess_lazyslider_wrapper(&$variables) {
  $variables['slides'] = lazyslider_prepare_slides();
}

/**
 * Generates slider markup.
 *
 * @return string Slider HTML markup
 */
function lazyslider_prepare_slides() {

    $slides = array();

    // Determine which slides should be visible
    foreach (variable_get('lazyslider_slides', array()) as $n => $slide) {

        // Only display published slides
        if (($slide['published'] == TRUE) && isset($slide['fid'])) {

            $pages = drupal_strtolower($slide['visibility']);
            $path = drupal_strtolower(drupal_get_path_alias($_GET['q']));
            $page_match = drupal_match_path($path, $pages);

            if ($path != $_GET['q']) {
                $page_match = $page_match || drupal_match_path($_GET['q'], $pages);
            }

            // Return visible slides only
            if ($page_match) {

                $file = file_load($slide['fid']);

                if (variable_get('lazyslider_image_style', 0) == FALSE) {
                    $url = file_create_url(check_plain($file->uri));
                } else {
                    $url = image_style_url(variable_get('lazyslider_image_style_slide', 'large'), check_plain($file->uri));
                }

                $item = array(
                    'description' => check_plain(lazyslider_translate('slide:' . $n . ':title', $slide['title'])),
                    'width' => $file->metadata['width'],
                    'height' => $file->metadata['height'],
                    'url' => $url,
                );

                if ($slide['url']) {
                    $item['link'] = url($slide['url']);
                }

                $slides[] = $item;
            }
        }
    }

    return $slides;
}
