( function( blocks, editor, i18n, element, components, _ ) {
	var el = element.createElement;
	var RichText = editor.RichText;
	var MediaUpload = editor.MediaUpload;
	var URLInputButton = editor.URLInputButton;

	blocks.registerBlockType( 'custom-repeater-block/repeater-row', {
		title: i18n.__( 'Custom Repeater Block Row' ),
		icon: 'index-card',
		category: 'layout',
		parent: ['custom-repeater-block/repeater'],
		attributes: {
			title: {
				type: 'array',
				source: 'children',
				selector: 'h3',
			},
			mediaID: {
				type: 'number',
			},
			mediaURL: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
			text: {
				type: 'array',
				source: 'children',
				selector: '.text',
			},
			url: {
				type: 'string'
			},
			link_text: {
				type: 'string'
			}
		},
		edit: function( props ) {
			var attributes = props.attributes;

			var onSelectImage = function( media ) {
				return props.setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
				} );
			};

			return (
				el( 'div', { className: props.className },
					el( RichText, {
						tagName: 'h3',
						inline: true,
						placeholder: i18n.__( 'Item title...' ),
						value: attributes.title,
						onChange: function( value ) {
							props.setAttributes( { title: value } );
						},
					} ),
					el( 'div', { className: 'image' },
						el( MediaUpload, {
							onSelect: onSelectImage,
							allowedTypes: 'image',
							value: attributes.mediaID,
							render: function( obj ) {
								return el( components.Button, {
										className: attributes.mediaID ? 'image-button' : 'button button-large',
										onClick: obj.open
									},
									! attributes.mediaID ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.mediaURL } )
								);
							}
						} )
					),
					el( 'h3', {}, i18n.__( 'Text:' ) ),
					el( RichText, {
						tagName: 'div',
						inline: false,
						placeholder: i18n.__( 'Write description...' ),
						value: attributes.text,
						onChange: function( value ) {
							props.setAttributes( { text: value } );
						},
					} ),
					el( URLInputButton, {
						className: props.className,
						url: props.attributes.url,
						onChange: function( url, post ) {
							props.setAttributes( { url: url, link_text: (post && post.title) || i18n.__('Click here') } );
						}
					} ),
				)
			);
		},
		save: function( props ) {
			var attributes = props.attributes;

			return (
				el( 'div', { className: props.className },
					el( RichText.Content, {
						tagName: 'h3', value: attributes.title
					} ),
					attributes.mediaURL &&
						el( 'div', { className: 'image' },
							el( 'img', { src: attributes.mediaURL } ),
						),
					el( RichText.Content, {
						tagName: 'div', className: 'text', value: attributes.text
					} ),
					el( 'a', {
						href: attributes.url,
						className: 'btn',
					}, attributes.link_text ),
				)
			);
		},
	} );

} )(
	window.wp.blocks,
	window.wp.editor,
	window.wp.i18n,
	window.wp.element,
	window.wp.components,
	window._,
);
