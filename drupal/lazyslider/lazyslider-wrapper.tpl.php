<?php

/**
 * @file
 * Default theme implementation for displaying a banner.
 *
 * A banner wraps slides in HTML, which provides an anchor for the Nivo Slider
 * to target and create a slideshow with the appropriate settings and theming.
 *
 * Available variables:
 * - $slides: String of HTML representing the block with slides.
 *
 * @see template_preprocess()
 * @see template_process()
 */
?>
<?php if($slides): ?>
    <div id="slider">
        <ul class="slides" style="display: none">
            <?php foreach ($slides as $slide): ?>
                <li class="slide"
                    data-src="<?php print $slide['url']; ?>"
                    data-width="<?php print $slide['width']; ?>"
                    data-height="<?php print $slide['height']; ?>"
                    <?php if (isset($slide['link'])): ?>data-link="<?php print $slide['link']; ?>"<?php endif; ?>
                    >
                    <a href="<?php print isset($slide['link']) ? $slide['link'] : $slide['url']; ?>"><?php print $slide['description']; ?></a>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
<?php endif; ?>
