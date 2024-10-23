
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import Edit from './edit';
import metadata from './block.json';
import save from "./save";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	title:metadata.title,
	icon:metadata.icon,
	attributes:metadata.attributes,
	supports:metadata.supports,
	edit: Edit,
	save
} );

