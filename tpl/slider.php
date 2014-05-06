<?php if($banners): ?>
    <div id="slider">
        <ul class="slides" style="display: none">
            <?php foreach ($banners as $banner): ?>
                <li class="slide" data-src="<?php print $banner['url']; ?>" data-width="<?php print $banner['width']; ?>" data-height="<?php print $banner['height']; ?>">
                    <a href="<?php print $banner['url']; ?>"><?php print $banner['description']; ?></a>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
<?php endif; ?>