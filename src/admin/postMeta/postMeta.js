import { useState } from '@wordpress/element';
import { Modal } from "@wordpress/components"
import { __ } from "@wordpress/i18n";
import MainInner from './MainInner';


function postMeta(){

	const [settingPopup, setSettingPopup] = useState(false);

	document.addEventListener("click", function (event) {
		if (event.target.id === "pacp-post-meta-settings") {
			setSettingPopup(true);
		}
	});

	const closeModal = () => setSettingPopup(false);

	(function (window, wp) {
		// just to keep it cleaner - we refer to our link by id for speed of lookup on DOM.
		var link_id = "pacp-post-meta-settings";
		var link_Label = __("Pop and Convert", "pop-and-convert");

		// prepare our custom link's html.
		var link_html =
			'<button class="post-settings-wrapper components-button is-primary" id="' + link_id + '"><span class="dashicons dashicons-bell" style="margin-inline-end: 5px;"></span>' + link_Label + '</button>';

		// check if gutenberg's editor root element is present.
		var editorEl = document.getElementById("editor");
		if (!editorEl) {
			return;
		}

		var unsubscribe = wp.data.subscribe(function () {
			setTimeout(function () {
				if (!document.getElementById(link_id)) {
					var toolbalEl = editorEl.querySelector(
						".edit-post-header__toolbar"
					);
					if (toolbalEl instanceof HTMLElement) {
						toolbalEl.insertAdjacentHTML("afterend", link_html);
					}
				}
			}, 1);
		});
	})(window, wp);

	return (
		settingPopup && (
			<Modal
				title={ __( 'Pop and Convert','pop-and-convert' ) }
				onRequestClose={closeModal}
				shouldCloseOnClickOutside={false}
				className="pacp-post-setting-wrapper pac-wrapper"
			>
				<MainInner setSettingPopup={setSettingPopup} />
			</Modal>
		)
	);
}
export default postMeta;