<?php

// Names of slide images

$slides = array(
    'banner-chezh-prague-roofs' => 'Slider #1 desciption',
    'banner-cyprus-magic-fountain' => 'Slider #2 desciption',
    'banner-cyprus-troodos' => 'Slider #3 desciption',

    'banner-florence-bridge' => 'Slider #4 desciption',
    'banner-spain-castle' => 'Slider #5 desciption',
    'banner-spain-chapel' => array('Slider #6 desciption', 'http://www.golftur.ru/trips/spain-catalonia-costa-del-maresme-callela.html'),
    'banner-spain-park-lake' => 'Slider #7 desciption',
    'banner-spain-shambala' => array('Slider #8 desciption', 'http://www.golftur.ru/trips/spain-tarragona-salou-PortAventura-theme-park.html'),
    'banner-switzerland-alps' => 'Slider #9 desciption',
    'banner-turkey-kaleici' => 'Slider #10 desciption',
    'banner-uae-al-mamzar' => 'Slider #11 desciption',
    'banner-uae-night' => 'Slider #12 desciption',
    'banner-venice-masks' => 'Slider #13 desciption',

);

// Collection information on banners

$banners = array();

foreach ($slides as $slide => $info) {

    $banner = array();

    if (is_array($info)) {
        list($banner['description'], $banner['link']) = $info;
    } else {
        $banner['description'] = $info;
    }

    $banner['url'] = $banner['path'] = "img/$slide.jpg";

    if (is_readable($banner['path'])) {

        if ($image = getimagesize($banner['path'])) {

            list($banner['width'], $banner['height']) = $image;

            $banners[] = $banner;
        }

    }
}

// Render the page

?><?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

    <head>
        <title>Lazy Slider example</title>
        <link rel="stylesheet" type="text/css" href="../lazyslider.css">
    </head>

    <body>

        <h1>Lazy Slider example</h1>

        <?php if($banners): ?>
            <div id="slider">
                <ul class="slides" style="display: none">
                    <?php foreach ($banners as $banner): ?>
                        <li class="slide"
                            data-src="<?php print $banner['url']; ?>"
                            data-width="<?php print $banner['width']; ?>"
                            data-height="<?php print $banner['height']; ?>"
                            <?php if (isset($banner['link'])): ?>data-link="<?php print $banner['link']; ?>"<?php endif; ?>
                        >
                            <a href="<?php print isset($banner['link']) ? $banner['link'] : $banner['url']; ?>"><?php print $banner['description']; ?></a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>

        <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script type="text/javascript" src="../lazyslider.js"></script>

        <script type="text/javascript">
            jQuery(window).load(function() {
                var options = {
                    animationSpeed: 700,
                    animationDelay: 5000,
                    captionAnimationSpeed: 150,
                    captionAnimationDelay: 600
                };
                jQuery('#slider').lazySlider(options);
            });
        </script>

    </body>

</html>