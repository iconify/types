/**
 * Icon dimensions
 *
 * Used in:
 *  icon (as is)
 *  alias (overwrite icon's properties)
 *  root of JSON file (default values)
 */
export interface IconifyDimenisons {
	width?: number;
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
	rotate?: number;
	hFlip?: boolean;
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
	parent: string;
}

/**
 * Icon
 */
export interface IconifyIcon extends IconifyOptional {
	body: string;
}

/**
 * "icons" field of JSON file
 */
export interface IconifyIcons {
	[index: string]: IconifyIcon;
}

/**
 * "aliases" field of JSON file
 */
export interface IconifyAliases {
	[index: string]: IconifyAlias;
}

/**
 * JSON structure
 *
 * All optional values can exist in root of JSON file, used as defaults
 */
export interface IconifyJSON extends IconifyOptional {
	prefix?: string;
	icons: IconifyIcons;
	aliases?: IconifyAliases;
}
