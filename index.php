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

include_once 'tpl/html.php';