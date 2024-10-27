<?php
/**
 * Plugin Name:       Sk Image Carousel
 * Description:       This is image carousel with text.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       sk-image-carousel
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Register the block
function create_block_sk_image_carousel_block_init() {
	register_block_type( __DIR__ . '/build', [
		'render_callback' => 'render_image_carousel_block',
	]);
}
add_action( 'init', 'create_block_sk_image_carousel_block_init' );

// Render the block on the front end
function render_image_carousel_block( $attributes ) {
	ob_start();
//print_r($attributes);
	$sliders = isset( $attributes['sliders'] ) ? $attributes['sliders'] : [];
	?>
	<div class="swiper mySwiper">
		<?php if ( ! empty( $sliders ) && is_array( $sliders ) ) : ?>
			<div class="swiper-wrapper">
				<?php foreach ( $sliders as $slider ) : ?>
					<div class="swiper-slide">
						<?php if ( ! empty( $slider['image'] ) ) : ?>
						<div class="slider-container"
							 style="background-image: url(<?php echo esc_url( $slider['image'] ); ?>);
								 height: 600px;
								 display: flex;
								 align-items: <?php echo esc_attr( $slider['verticalAlign'] ); ?>;
								 justify-content: <?php echo esc_attr( $slider['horizontalAlign'] ); ?>;">
							<?php endif; ?>

							<div class="slider-text-container">
								<?php if ( ! empty( $slider['heading'] ) ) : ?>
									<h2 style="color: <?php echo esc_attr( $slider['headingTextColor'] ); ?>;
										background-color: <?php echo esc_attr( $slider['headingBackgroundColor'] ); ?>;
										font-size: <?php echo esc_attr( $slider['headingFontSize'] ); ?>px;">
										<?php echo esc_html( $slider['heading'] ); ?>
									</h2>
								<?php endif; ?>

								<?php if ( ! empty( $slider['description'] ) ) : ?>
									<p style="color: <?php echo esc_attr( $slider['descriptionTextColor'] ); ?>;
										background-color: <?php echo esc_attr( $slider['descriptionBackgroundColor'] ); ?>;
										font-size: <?php echo esc_attr( $slider['descriptionFontSize'] ); ?>px;">
										<?php echo esc_html( $slider['description'] ); ?>
									</p>
								<?php endif; ?>

								<?php if ( ! empty( $slider['buttonText'] ) && ! empty( $slider['buttonUrl'] ) ) : ?>

									<a href="<?php echo esc_url( $slider['buttonUrl'] ); ?>"
									   style="background-color: <?php echo esc_attr( $slider['buttonBackgroundColor'] ); ?>;
									   font-size: <?php echo esc_attr( $slider['buttonFontSize'] ); ?>px;
									   color: <?php echo esc_attr( $slider['buttonTextColor'] ); ?>;
										   padding: 12px 10px;
										   margin-top: 10px;
										   text-align: center;
										   ">
										<?php echo esc_html( $slider['buttonText'] ); ?>
									</a>

								<?php endif; ?>
							</div>

							<?php if ( ! empty( $slider['image'] ) ) : ?>
						</div> <!-- End of .slider-container -->
					<?php endif; ?>
					</div> <!-- End of .swiper-slide -->
				<?php endforeach; ?>
			</div> <!-- End of .swiper-wrapper -->

			<div class="swiper-pagination"></div>
			<div class="swiper-button-next"></div>
			<div class="swiper-button-prev"></div>
		<?php else : ?>
			<p><?php esc_html_e( 'No sliders available.', 'text-domain' ); ?></p>
		<?php endif; ?>
	</div>

	<script>
		document.addEventListener('DOMContentLoaded', function() {
			var swiper = new Swiper('.mySwiper', {
				spaceBetween: 30,
				centeredSlides: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});
		});
	</script>

	<?php
	return ob_get_clean();
}

// Enqueue scripts and styles
add_action('wp_enqueue_scripts', 'render_image_carousel_block_editor_assets');
function render_image_carousel_block_editor_assets() {
	$asset = include plugin_dir_path(__FILE__) . 'build/index.asset.php';

	// Enqueue Swiper styles
	wp_enqueue_style('swiper-css', plugin_dir_url(__FILE__).'src/sweeper/sp.css', array(), null);
	wp_enqueue_style('image-custom-css', plugin_dir_url(__FILE__) . 'build/style-index.css', array(), $asset['version'], 'all');
	// Enqueue Swiper script
	wp_enqueue_script('swiper-js', plugin_dir_url(__FILE__).'src/sweeper/sp.js'  , array('jquery'), null, true);

}
