# Iconify Types

Type definitions for using Iconify libraries and JSON files with TypeScript.

## Files structure

Iconify icon sets are available in several formats:

- JSON files that combine many icons in one file
- Node.js packages split into individual icons

### Icon format

Each icon is represented by `IconifyIcon` type. It is a simple object with multiple string, number or boolean attributes.

The only required attribute is:

- `body` that contains inner HTML of icon as string, for example `<path d="..."/>`

Optional attributes are represented by type `IconifyOptional`. They are split into several types: dimensions (`IconifyDimenisons` type) and transformations (`IconifyTransformations` type).

Dimensions attributes:

- `width` viewBox width, number. If missing, value is set to 16
- `height` viewBox height, number. If missing, value is set to 16
- `left` viewBox left, number. If missing, value is set to 0
- `top` viewBox top, number. If missing, value is set to 0

Transformations:

- `rotate` icon rotation, number. Iconify icons can be rotated in 90 degrees increments, allowing to reuse same source icon for multiple icons, such as arrow-up being copy of arrow-left rotated by 90 degrees. Values are 0 for 0 degrees, 1 for 90 degrees, 2 for 180 degrees, 3 for 270 degrees. Default value is 0.
- `hFlip` horizontal flip, boolean. Similar to rotation, icon can be flipped. It can be used to quickly create aliases, such as arrow-left being alias of arrow-right, but with hFlip set to true. Default value is false.
- `vFlip` vertical flip. Default value is false.

Example of icon object:

```js
const mdiHandIcon = {
	body:
		'<path d="M6.58 19h8v3h-8v-3m13.16-7.4c-.19-.2-.45-.32-.74-.32l-.22.03l-3.2 1.69v-1.17l.51-8.93c.03-.55-.39-1.03-.94-1.06c-.55-.03-1.03.39-1.06.94l-.27 4.69h-.24l-1.04.11V2a1 1 0 0 0-1-1c-.54 0-1 .45-1 1v6.41l-.82.37l-.69-5.46c-.07-.55-.57-.94-1.12-.87c-.55.05-.94.55-.87 1.12l.77 6.06l-.38.17c-.13.05-.25.13-.36.2l-1.1-3.89c-.16-.57-.72-.91-1.26-.77c-.53.16-.83.74-.67 1.31l2.57 9.12c0 .03.02.07.03.1l.03.13h.01c.22.57.79 1 1.4 1h6.5c.39 0 .74-.16 1-.43l4.92-4.2l-.76-.77z" fill="currentColor"/>',
	width: 24,
	height: 24,
};
```

### JSON format

Iconify JSON format is available from multiple sources:

- NPM package @iconify/json that includes all icon sets
- API responses used by SVG framework

JSON format structure is available as `IconifyJSON` type. It is an object with several fields:

- `prefix` icon set prefix, string
- `icon` icons data, object where key is icon name and value is `IconifyIcon` object (see "Icon format" above)
- `aliases` icon aliases, object (see "Aliases" section below)

Example:

```json
{
	"prefix": "mdi",
	"icons": {
		"home": {
			"body": "<path d=\"M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z\" fill=\"currentColor\"/>",
			"width": 24,
			"height": 24
		},
		"arrow-left": {
			"body": "<path d=\"M20 11v2H8l5.5 5.5l-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5L8 11h12z\" fill=\"currentColor\"/>",
			"width": 24,
			"height": 24
		}
	}
}
```

All icon properties except for `body` are optional and are represented by type `IconifyOptional`. Type `IconifyJSON` also extends type `IconifyOptional`, allowing all optional properties to be placed in root object.

If icon is missing a property, look in root object for default value. If root object does not have default value, use global default value for that property (see list of properties and default values in "Icon format" section above).

This allows to reduce duplication.

Example:

```json
{
	"prefix": "mdi",
	"icons": {
		"home": {
			"body": "<path d=\"M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z\" fill=\"currentColor\"/>"
		},
		"arrow-left": {
			"body": "<path d=\"M20 11v2H8l5.5 5.5l-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5L8 11h12z\" fill=\"currentColor\"/>"
		}
	},
	"width": 24,
	"height": 24
}
```

In this example both icons are 24x24, so width and height have been moved to root object.

Another example:

```json
{
	"prefix": "fa-solid",
	"icons": {
		"arrow-left": {
			"body": "<path d=\"M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z\" fill=\"currentColor\"/>",
			"width": 448
		},
		"arrow-circle-left": {
			"body": "<path d=\"M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248s-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z\" fill=\"currentColor\"/>"
		},
		"barcode": {
			"body": "<path d=\"M0 448V64h18v384H0zm26.857-.273V64H36v383.727h-9.143zm27.143 0V64h8.857v383.727H54zm44.857 0V64h8.857v383.727h-8.857zm36 0V64h17.714v383.727h-17.714zm44.857 0V64h8.857v383.727h-8.857zm18 0V64h8.857v383.727h-8.857zm18 0V64h8.857v383.727h-8.857zm35.715 0V64h18v383.727h-18zm44.857 0V64h18v383.727h-18zm35.999 0V64h18.001v383.727h-18.001zm36.001 0V64h18.001v383.727h-18.001zm26.857 0V64h18v383.727h-18zm45.143 0V64h26.857v383.727h-26.857zm35.714 0V64h9.143v383.727H476zm18 .273V64h18v384h-18z\" fill=\"currentColor\"/>"
		}
	},
	"width": 512,
	"height": 512
}
```

In this example `arrow-circle-left` and `barcode` have width of 512, `arrow-left` has width of 448. All icons have height of 512.

#### Aliases

In addition to `icons`, another important field in JSON object is `aliases`.

Aliases object is similar to icons object, except that instead of icon body icons reference another icon.

Each entry has same attributes as icon, except for `body` and has required attribute `parent` that contains name of parent icon. Parent icon must be included in JSON file as well as icon.

Example:

```json
{
	"prefix": "fa",
	"icons": {
		"automobile": {
			"body": "<path d=\"M480 960q0-66-47-113t-113-47t-113 47t-47 113t47 113t113 47t113-47t47-113zm36-320h1016l-89-357q-2-8-14-17.5t-21-9.5H640q-9 0-21 9.5T605 283zm1372 320q0-66-47-113t-113-47t-113 47t-47 113t47 113t113 47t113-47t47-113zm160-96v384q0 14-9 23t-23 9h-96v128q0 80-56 136t-136 56t-136-56t-56-136v-128H512v128q0 80-56 136t-136 56t-136-56t-56-136v-128H32q-14 0-23-9t-9-23V864q0-93 65.5-158.5T224 640h28l105-419q23-94 104-157.5T640 0h768q98 0 179 63.5T1691 221l105 419h28q93 0 158.5 65.5T2048 864z\" fill=\"currentColor\"/>",
			"width": 2048,
			"height": 1600
		}
	},
	"aliases": {
		"car": {
			"parent": "automobile"
		}
	}
}
```

In this example "car" is alias of "automobile", allowing to use same icon by multiple names.

Another example:

```json
{
	"prefix": "fa",
	"icons": {
		"caret-left": {
			"body": "<path d=\"M576 192v896q0 26-19 45t-45 19t-45-19L19 685Q0 666 0 640t19-45l448-448q19-19 45-19t45 19t19 45z\" fill=\"currentColor\"/>",
			"width": 576,
			"height": 1280
		}
	},
	"aliases": {
		"caret-right": {
			"parent": "caret-left",
			"hFlip": true
		}
	}
}
```

In this example `caret-right` is alias of `caret-left`, but with additional `hFlip` attribute. It is identical to this:

```json
{
	"prefix": "fa",
	"icons": {
		"caret-left": {
			"body": "<path d=\"M576 192v896q0 26-19 45t-45 19t-45-19L19 685Q0 666 0 640t19-45l448-448q19-19 45-19t45 19t19 45z\" fill=\"currentColor\"/>"
		},
		"caret-right": {
			"body": "<path d=\"M576 192v896q0 26-19 45t-45 19t-45-19L19 685Q0 666 0 640t19-45l448-448q19-19 45-19t45 19t19 45z\" fill=\"currentColor\"/>",
			"hFlip": true
		}
	},
	"width": 576,
	"height": 1280
}
```

##### Merging alias attributes

If both icon and alias have same attribute, following rules apply:

- `rotate`: attributes are combined. For example, icon has rotate = 1, alias has rotate = 1. Result will have rotate = 2. If rotate > 3, rotate = rotate - 4.
- `hFlip` and `vFlip`: attributes are combined. For example, icon has hFlip = true, alias also has hFlip = true (icon.hFlip !== alias.hFlip). Result is false. false + false = false, false + true = true, true + true = false.
- other attributes are overwritten.

Example:

```json
{
	"prefix": "fa",
	"icons": {
		"caret-left": {
			"body": "<path d=\"M576 192v896q0 26-19 45t-45 19t-45-19L19 685Q0 666 0 640t19-45l448-448q19-19 45-19t45 19t19 45z\" fill=\"currentColor\"/>",
			"hFlip": true,
			"width": 576,
			"height": 1280
		}
	},
	"aliases": {
		"caret-left-compact": {
			"parent": "caret-left",
			"left": 64,
			"width": 448
		},
		"caret-right": {
			"parent": "caret-left",
			"hFlip": true
		}
	}
}
```

is identical to:

```json
{
	"prefix": "fa",
	"icons": {
		"caret-left": {
			"body": "<path d=\"M576 192v896q0 26-19 45t-45 19t-45-19L19 685Q0 666 0 640t19-45l448-448q19-19 45-19t45 19t19 45z\" fill=\"currentColor\"/>",
			"hFlip": true
		},
		"caret-left-compact": {
			"body": "<path d=\"M576 192v896q0 26-19 45t-45 19t-45-19L19 685Q0 666 0 640t19-45l448-448q19-19 45-19t45 19t19 45z\" fill=\"currentColor\"/>",
			"hFlip": true, // from caret-left
			"left": 64, // overwritten
			"width": 448 // overwritten
		},
		"caret-right": {
			"body": "<path d=\"M576 192v896q0 26-19 45t-45 19t-45-19L19 685Q0 666 0 640t19-45l448-448q19-19 45-19t45 19t19 45z\" fill=\"currentColor\"/>"
			// hFlip = false, which is default value, so it was removed
		}
	},
	"width": 576,
	"height": 1280
}
```

#### Meta data

JSON files might also contain meta data. That data is used for browsing icons, searching icons, exporting icon sets as fonts.

Meta data is combination of several types, represented as type `IconifyMetaData`.

##### Icon set information

Icon set information is part of meta data, it includes information about author and license.

Example:

```json
{
	"prefix": "dashicons",
	"info": {
		"name": "Dashicons",
		"total": 304,
		"author": {
			"name": "WordPress",
			"url": "https://github.com/WordPress/dashicons"
		},
		"license": {
			"title": "GPL 2.0",
			"spdx": "GPL-2.0-only",
			"url": "http://www.gnu.org/licenses/gpl-2.0.html"
		},
		"version": "0.9.0",
		"samples": ["shortcode", "businessperson", "editor-expand"],
		"height": 20,
		"category": "General",
		"palette": false
	},
	"icons": {
		// Icons here
	}
}
```

##### Characters map

Characters map is part of meta data, it is used for icon sets are are either imported from icon fonts or intended to be exported to icon font.

Characters map allows to store characters for export as well as searching icons by character used in icon font.

It is a simple object, where key is character code in hexadecimal form, value is icon name.

Important: each icon can have multiple characters!

Example:

```json
{
	"prefix": "fa",
	"icons": {
		// Icons here
	},
	"chars": {
		"f000": "glass",
		"f001": "music",
		"f002": "search",
		"f003": "envelope-o",
		"f004": "heart",
		"f005": "star"
		// and so on...
	}
}
```

##### Categories

Categories are part of meta data, used to allow filtering icons when showing entire icons set.

Categories list is simple object, where key is category name, value is list of icons.

Important: each icon can belong to multiple categories!

```json
{
	"prefix": "fa-solid",
	"icons": {
		// Icons here
	},
	"categories": {
		"Accessibility": [
			"american-sign-language-interpreting",
			"assistive-listening-systems",
			"audio-description",
			"blind",
			"braille",
			"closed-captioning",
			"deaf",
			"low-vision",
			"phone-volume",
			"question-circle",
			"sign-language",
			"tty",
			"universal-access",
			"wheelchair"
		],
		"Alert": [
			"bell",
			"bell-slash",
			"exclamation",
			"exclamation-circle",
			"exclamation-triangle",
			"radiation",
			"radiation-alt",
			"skull-crossbones"
		]
		// and so on...
	}
}
```

##### Themes

Themes are part of meta data, similar to categories, but using prefixes or suffixes to identify icons that belong to theme.

This is useful when icon set has variations of icons, such as "baseline-_", "outline-_".

Example:

```json
{
	"prefix": "ic",
	"icons": {
		// Icons here
	},
	"themes": {
		"baseline": {
			"title": "Baseline",
			"prefix": "baseline-"
		},
		"outline": {
			"title": "Outline",
			"prefix": "outline-"
		},
		"round": {
			"title": "Round",
			"prefix": "round-"
		},
		"sharp": {
			"title": "Sharp",
			"prefix": "sharp-"
		},
		"twotone": {
			"title": "Two-Tone",
			"prefix": "twotone-"
		}
	}
}
```

Each theme can have one of attributes: `prefix` or `suffix`. Prefix must end with `-`, suffix must start with `-`.

In example above, all icons that start with "baseline-", such as "baseline-home", are considered part of "Baseline" theme.

#### All attributes

For example of full JSON files that include meta data, look in JSON files in `@iconify/json` package or browse it at GitHub: https://github.com/iconify/collections-json

For example of individual icons, look in JavaScript files in NPM packages such as `@iconify/icons-mdi`.

## Usage

This repository is intended to be used with any Iconify packages.

At the moment of writing, there are multiple Iconify packages that are written without TypeScript. At the beginning of 2020 plan is to rewrite all of them with TypeScript to make sure data is consistent and avoid duplication, this package will be used for sharing types between Iconify packages.

## License

Iconify is dual-licensed under Apache 2.0 and GPL 2.0 license. You may select, at your option, one of the above-listed licenses.

`SPDX-License-Identifier: Apache-2.0 OR GPL-2.0`
