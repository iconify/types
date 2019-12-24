/**
 * Icon dimensions
 *
 * Used in:
 *  icon (as is)
 *  alias (overwrite icon's properties)
 *  root of JSON file (default values)
 */
export interface IconifyDimenisons {
	// Left position of viewBox.
	// Defaults to 0.
	left?: number;

	// Top position of viewBox.
	// Defaults to 0.
	top?: number;

	// Width of viewBox.
	// Defaults to 16.
	width?: number;

	// Height of viewBox.
	// Defaults to 16.
	height?: number;
}

/**
 * Icon transformations
 *
 * Used in:
 *  icon (as is)
 *  alias (merged with icon's properties)
 *  root of JSON file (default values)
 */
export interface IconifyTransformations {
	// Number of 90 degrees rotations.
	// 0 = 0, 1 = 90deg and so on.
	// Defaults to 0.
	// When merged (such as alias + icon), result is icon.rotation + alias.rotation.
	rotate?: number;

	// Horizontal flip.
	// Defaults to false.
	// When merged, result is icon.hFlip !== alias.hFlip
	hFlip?: boolean;

	// Vertical flip. (see hFlip comments)
	vFlip?: boolean;
}

/**
 * Combination of dimensions and transformations
 */
export interface IconifyOptional
	extends IconifyDimenisons,
		IconifyTransformations {}

/**
 * Alias
 */
export interface IconifyAlias extends IconifyOptional {
	// Parent icon index without prefix, required.
	parent: string;

	// IconifyOptional properties.
	// Alias should have only properties that it overrides.
	// Transformations are merged, not overridden. See IconifyTransformations comments.
}

/**
 * Icon
 */
export interface IconifyIcon extends IconifyOptional {
	// Icon body: <path d="..." />, required.
	body: string;

	// IconifyOptional properties.
	// If property is missing in JSON file, look in root object for default value.
}

/**
 * "icons" field of JSON file
 */
export interface IconifyIcons {
	// Index is name of icon, without prefix. Value is IconifyIcon object.
	[index: string]: IconifyIcon;
}

/**
 * "aliases" field of JSON file
 */
export interface IconifyAliases {
	// Index is name of icon, without prefix. Value is IconifyAlias object.
	[index: string]: IconifyAlias;
}

/**
 * JSON structure
 *
 * All optional values can exist in root of JSON file, used as defaults
 */
export interface IconifyJSON extends IconifyOptional {
	// Prefix for icons in JSON file, required.
	prefix: string;

	// List of icons, required.
	icons: IconifyIcons;

	// Optional aliases.
	aliases?: IconifyAliases;

	// IconifyOptional properties that are used as default values for icons when icon is missing value.
	// If property exists in both icon and root, use value from icon.
	// This is used to reduce duplication.
}
