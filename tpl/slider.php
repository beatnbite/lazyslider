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