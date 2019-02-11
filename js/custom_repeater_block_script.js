( function( blocks, editor, i18n, element, components, _ ) {

	//console.log(editor);
	
	var el = element.createElement;
	var RichText = editor.RichText;
	var MediaUpload = editor.MediaUpload;
	var URLInputButton = editor.URLInputButton;
	var InnerBlocks = editor.InnerBlocks;

	blocks.registerBlockType( 'custom-repeater-block/repeater', {
		title : i18n.__( 'Custom Repeater Block' ),

		icon: 'universal-access-alt',

		description: i18n.__( 'Custom Repeater Block' ),

		category: 'widgets',

		attributes: {
			block_title: {
				type: 'string',
				source: 'html',
				selector: 'h2',
			},
			content: {
				type: 'string',
				source: 'html',
				selector: 'p',
			},
			link_url: {
				type: 'string'
			},
			link_text: {
				type: 'string'
			}
		},

		edit: function( props ) {
			var block_title = props.attributes.block_title;
			var content = props.attributes.content;

			function onChangeBlockTitle( newTitle ) {
				props.setAttributes( { block_title: newTitle } );
			}
			
			function onChangeContent( newContent ) {
				props.setAttributes( { content: newContent } );
			}

			return el( 'div', { className: props.className },
				el(	RichText, {
					tagName: 'h2',
					inline: true,
					onChange: onChangeBlockTitle,
					value: block_title,
					placeholder: i18n.__( 'Block title...' ),
				} ),
				el(	RichText, {
					tagName: 'p',
					onChange: onChangeContent,
					value: content,
					placeholder: i18n.__( 'Block description...' ),
				} ),
				el( 'div', { className: 'rows' }, el( InnerBlocks, { allowedBlocks : [ 'custom-repeater-block/repeater-row' ] } ) ),
				el( URLInputButton, {
					url: props.attributes.link_url,
					onChange: function( url, post ) {
						props.setAttributes( { link_url: url, link_text: (post && post.title) || 'Click here test' } );
					}
				} ),
			);
		},

		save: function( props ) {
			var block_title = props.attributes.block_title;
			var content = props.attributes.content;
			var attributes = props.attributes;

			return el( 'div', { className: props.className },
				el( RichText.Content, {
					tagName: 'h2',
					value: block_title
				}),
				el( RichText.Content, {
					tagName: 'p',
					value: content
				}),
				el( 'div', { className: 'rows' }, 
					el( InnerBlocks.Content )
				),
				attributes.link_url && el( 'a', {
					href: attributes.link_url,
					className: 'btn',
				}, attributes.link_text ),
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
