import { cn } from '../../lib/utils'

export default ({ callback, className, children }) => {
    let frame;
    const runUploader = (event) => {
        event.preventDefault();

        // If the media frame already exists, reopen it.
        if (frame) {
            frame.open();
            return;
        }

        // Create a new media frame
        frame = wp.media({
            title: 'Select or Upload Media Of Your Chosen Persuasion',
            button: {
                text: 'Use this media',
            },
            multiple: false, // Set to true to allow multiple files to be selected
            library: {
                type: 'image', // Only show images in the media library
            },
        });

        // When the user selects media, get the URL and call the callback
        frame.on('select', () => {
            const selectedMedia = frame.state().get('selection').first().toJSON();
            var allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (allowedTypes.indexOf(selectedMedia.mime) !== -1) {
                // The selected file is an allowed image type
                // Process the upload or perform further actions here
                const imageUrl = selectedMedia.url;
                const imageId = selectedMedia.id;
                if (callback) {
                    callback(imageUrl, imageId);
                }
            } else {
                // Alert the user that only image files are allowed
                alert('Please select an image file (JPEG, WEBP, PNG or GIF).');
            }
            
        });

        // Finally, open the modal on click
        frame.open();
    };
    return (
        <>
            <div className={cn(`block`, className)} onClick={runUploader}>
                {children}
            </div>
        </>
    )
}
