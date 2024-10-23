import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload } from '@wordpress/block-editor';
import { Button, PanelBody, ColorPalette, FontSizePicker, TextControl } from '@wordpress/components';
import { Fragment } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useEffect, useRef } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.scss';
// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Edit({ attributes, setAttributes }) {
	const { sliders = [] } = attributes;

	const addNewSlider = () => {
		const newSliders = [...sliders, {
			image: '',
			heading: '',
			description: '',
			buttonText: '',
			buttonUrl: '',
			headingTextColor: '#000',
			headingBackgroundColor: '#fff',
			headingFontSize: 24,
			descriptionTextColor: '#000',
			descriptionBackgroundColor: '#fff',
			descriptionFontSize: 16,
			buttonTextColor: '#fff',
			buttonBackgroundColor: '#0073aa',
			buttonFontSize: 16,
		}];
		setAttributes({ sliders: newSliders });
	};

	const updateSlider = (index, attribute, value) => {
		const newSliders = [...sliders];
		newSliders[index][attribute] = value;
		setAttributes({ sliders: newSliders });
	};

	const removeSlider = (index) => {
		const newSliders = sliders.filter((_, i) => i !== index);
		setAttributes({ sliders: newSliders });
	};
	const swiperRef = useRef(null);

	useEffect(() => {
		if (swiperRef.current) {
			swiperRef.current.swiper.update();
		}
	}, [sliders]);
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Carousel Settings', 'sk-image-carousel')}>
					{sliders.map((slider, index) => (
						<PanelBody title={`Slider ${index + 1}`} key={index}>
							<MediaUpload
								onSelect={(media) => updateSlider(index, 'image', media.url)}
								allowedTypes={['image']}
								render={({ open }) => (
									<>
										{slider.image ? (
											<>
												<img src={slider.image} alt={__('Selected Image', 'sk-image-carousel')} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
												<Button isSecondary onClick={open}>{__('Change Image', 'sk-image-carousel')}</Button>
												<Button isDestructive onClick={() => updateSlider(index, 'image', '')} style={{ marginTop: '10px' }}>{__('Remove Image', 'sk-image-carousel')}</Button>
											</>
										) : (
											<Button onClick={open}>{__('Select Image', 'sk-image-carousel')}</Button>
										)}
									</>
								)}
							/>
							<TextControl
								label={__('Heading', 'sk-image-carousel')}
								value={slider.heading}
								onChange={(value) => updateSlider(index, 'heading', value)}
							/>
							<ColorPalette
								value={slider.headingTextColor}
								onChange={(newColor) => updateSlider(index, 'headingTextColor', newColor)}
								label={__('Heading Text Color', 'sk-image-carousel')}
							/>
							<ColorPalette
								value={slider.headingBackgroundColor}
								onChange={(newColor) => updateSlider(index, 'headingBackgroundColor', newColor)}
								label={__('Heading Background Color', 'sk-image-carousel')}
							/>
							<FontSizePicker
								value={slider.headingFontSize}
								onChange={(newSize) => updateSlider(index, 'headingFontSize', newSize)}
								label={__('Heading Font Size', 'sk-image-carousel')}
							/>

							<TextControl
								label={__('Description', 'sk-image-carousel')}
								value={slider.description}
								onChange={(value) => updateSlider(index, 'description', value)}
							/>
							<ColorPalette
								value={slider.descriptionTextColor}
								onChange={(newColor) => updateSlider(index, 'descriptionTextColor', newColor)}
								label={__('Description Text Color', 'sk-image-carousel')}
							/>
							<ColorPalette
								value={slider.descriptionBackgroundColor}
								onChange={(newColor) => updateSlider(index, 'descriptionBackgroundColor', newColor)}
								label={__('Description Background Color', 'sk-image-carousel')}
							/>
							<FontSizePicker
								value={slider.descriptionFontSize}
								onChange={(newSize) => updateSlider(index, 'descriptionFontSize', newSize)}
								label={__('Description Font Size', 'sk-image-carousel')}
							/>

							<TextControl
								label={__('Button Text', 'sk-image-carousel')}
								value={slider.buttonText}
								onChange={(value) => updateSlider(index, 'buttonText', value)}
							/>
							<TextControl
								label={__('Button URL', 'sk-image-carousel')}
								value={slider.buttonUrl}
								onChange={(value) => updateSlider(index, 'buttonUrl', value)}
							/>
							<ColorPalette
								value={slider.buttonTextColor}
								onChange={(newColor) => updateSlider(index, 'buttonTextColor', newColor)}
								label={__('Button Text Color', 'sk-image-carousel')}
							/>
							<ColorPalette
								value={slider.buttonBackgroundColor}
								onChange={(newColor) => updateSlider(index, 'buttonBackgroundColor', newColor)}
								label={__('Button Background Color', 'sk-image-carousel')}
							/>
							<FontSizePicker
								value={slider.buttonFontSize}
								onChange={(newSize) => updateSlider(index, 'buttonFontSize', newSize)}
								label={__('Button Font Size', 'sk-image-carousel')}
							/>

							<Button isDestructive onClick={() => removeSlider(index)}>
								{__('Remove Slider', 'sk-image-carousel')}
							</Button>
						</PanelBody>
					))}
					<Button isPrimary onClick={addNewSlider}>
						{__('Add New Slider', 'sk-image-carousel')}
					</Button>
				</PanelBody>
			</InspectorControls>

			{/* Preview inside block editor */}
			<div {...useBlockProps()}>
				{Array.isArray(sliders) && sliders.length > 0 ? (
					<Swiper
						ref={swiperRef}

						spaceBetween={30}
						centeredSlides={true}
						autoplay={{
							delay: 2500,
							disableOnInteraction: false,
						}}
						pagination={{
							clickable: true,
						}}
						navigation={true}
						modules={[Autoplay, Pagination, Navigation]}
						className="mySwiper"
					>
						{sliders.map((slider, index) => (
							<SwiperSlide key={index}>
								{slider.image && (
									<img src={slider.image} alt={`Slide ${index + 1}`} style={{ maxWidth: '100%' }} />
								)}
								{slider.heading && (
									<h2 style={{
										color: slider.headingTextColor,
										backgroundColor: slider.headingBackgroundColor,
										fontSize: `${slider.headingFontSize}px`,
									}}>
										{slider.heading}
									</h2>
								)}
								{slider.description && (
									<p style={{
										color: slider.descriptionTextColor,
										backgroundColor: slider.descriptionBackgroundColor,
										fontSize: `${slider.descriptionFontSize}px`,
									}}>
										{slider.description}
									</p>
								)}
								{slider.buttonText && (
									<a href={slider.buttonUrl} style={{
										color: slider.buttonTextColor,
										backgroundColor: slider.buttonBackgroundColor,
										fontSize: `${slider.buttonFontSize}px`,
										display: 'inline-block',
										padding: '10px 20px',
										marginTop: '10px',
									}}>
										{slider.buttonText}
									</a>
								)}
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<p>No sliders available.</p>
				)}
			</div>
		</Fragment>
	);
}
