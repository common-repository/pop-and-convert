import { __ } from "@wordpress/i18n";
import { applyFilters } from "@wordpress/hooks";

export default function License() {
    return (
        <>
            {applyFilters('pac_license_activation_placeholder', null)}
        </>
    )
}