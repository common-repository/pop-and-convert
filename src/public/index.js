import './scss/public.scss'

//Convert Time to Seconds
function timeToSecond(str) {
    // Use a regular expression to extract the number and the unit from the string
    let regex = /(\d+)(hour|min|sec)/;
    let match = str.match(regex);
    // If there is a match, convert the number to an integer and the unit to a lowercase string
    if (match) {
        let number = parseInt(match[1]);
        let unit = match[2].toLowerCase();
        // Declare a variable to store the result
        let second;
        // Use a switch statement to handle different units
        switch (unit) {
            // If the unit is hour, multiply the number by 3600
            case "hour":
                second = number * 3600;
                break;
            // If the unit is min, multiply the number by 60
            case "min":
                second = number * 60;
                break;
            // If the unit is sec, assign the number to the result
            case "sec":
                second = number;
                break;
            // If the unit is not recognized, return an error message
            default:
                return "Invalid unit";
        }
        // Return the result in seconds
        return second;
    }
    // If there is no match, return an error message
    else {
        return "Invalid input";
    }
}

const pac = document.querySelector('#pop-and-convert-frontend')

if (pac !== null) {
    const pac_popup = document.getElementById("pac_popup");
    const pacNotifi = document.querySelector('#pop-and-convert-frontend .pac-notification')
    const popupNotifi = document.querySelector('#pop-and-convert-frontend .popup')

    function dismissNotificationTimer() {
        const pacId = pacNotifi.getAttribute('data-id')
        let pacClosedTime = localStorage.getItem(`pacClosedTime-${pacId}`);

        if (pacClosedTime) {
            let currentTime = new Date().getTime()

            // calculate the remaining time until popup
            const remainingTime = Math.max(0, pacClosedTime - currentTime)
            // Schedule the opening of the popup if there is remaining time
            if (remainingTime >= 0) {
                setTimeout(() => {
                    const pac_sticky = document.querySelector('.pac-notification.sticky');

                    if (pac_sticky !== null) {
                        pac_sticky.classList.remove('hide')
                    } else if (pac_popup !== null) {
                        popupNotifi.classList.contains('popup-layout-3') ?
                            pac_popup.show() : pac_popup.showModal();
                    }
                    localStorage.removeItem('pacClosedTime')
                }, remainingTime);

            } else {
                // Clear the notification data from local storage if the time has passed
                localStorage.removeItem('pacClosedTime')
            }
        }
    }

    // preview close button 

    const handleStickyButton = () => {
        const stickyNotifi = document.querySelector('#pop-and-convert-frontend .sticky')
        if (stickyNotifi !== null) {
            const closeButton = document.querySelector('.pac-close-button.cross')
            const pacId = pacNotifi.getAttribute('data-id')
            if(closeButton !== null){
                closeButton.addEventListener('click', () => {
                    pacNotifi.classList.toggle('hide')

                    //Create a Local Storage to save the time
                    const pacClosedTime = new Date().getTime() + (timeToSecond(pacpPublicData.pacp_settings.dismiss) * 1000);
                    localStorage.setItem(`pacClosedTime-${pacId}`, pacClosedTime);
                    dismissNotificationTimer() //Set Timer for the notification to show again
                })
            }

            const downButton = document.querySelector('.pac-close-button.down')
            const previewDown = document.querySelector('.pac-sticky-wrapper')
            if(downButton !== null){
                downButton.addEventListener('click', () => {
                    previewDown.classList.toggle('hide')
                })
            }
        }
    }

    const handlePopup = () => {
        if (popupNotifi !== null) {
            const close_pac_popup = document.querySelector(".pac_popup-btn--cross");
            const pac_hide_btn = document.querySelector(".pac_popup-btn--hide");
            const pac_desc = document.querySelector(".pac_popup__description");
            const pacId = popupNotifi.getAttribute('data-id')

            if (pac_hide_btn !== null) {
                function toggle_pac_desc() {
                    if (pac_hide_btn.getAttribute("aria-expanded") === "true") {
                        pac_hide_btn.setAttribute("aria-expanded", false);
                        pac_desc.setAttribute("aria-hidden", true);
                    } else {
                        pac_hide_btn.setAttribute("aria-expanded", true);
                        pac_desc.setAttribute("aria-hidden", false);
                    }
                }

                pac_hide_btn.addEventListener('click', toggle_pac_desc)

            }

            close_pac_popup.addEventListener("click", () => {
                pac_popup.setAttribute("closing", "");
                pac_popup.addEventListener(
                    "animationend",
                    () => {
                        pac_popup.removeAttribute("closing");
                        pac_popup.close();

                    },
                    { once: true }
                );

                //Create a Local Storage to save the time
                const pacClosedTime = new Date().getTime() + (timeToSecond(pacpPublicData.pacp_settings.dismiss) * 1000);
                localStorage.setItem(`pacClosedTime-${pacId}`, pacClosedTime);
                dismissNotificationTimer() //Set Timer for the notification to show again
            })
        }

    }

    // focus trap 
    const focusTrap = () => {

        if (null !== pac) {
            pac.addEventListener('keydown', (event) => {
                if (event.key === 'Tab') {
                    const focusableElements = pac.querySelectorAll('button, [href]');
                    const firstFocusable = focusableElements[0];
                    const lastFocusable = focusableElements[focusableElements.length - 1];

                    if (!event.shiftKey && document.activeElement === lastFocusable) {
                        event.preventDefault();
                        firstFocusable.focus();
                    } else if (event.shiftKey && document.activeElement === firstFocusable) {
                        event.preventDefault();
                        lastFocusable.focus();
                    }
                }
            });
        }
    }

    const closePacNotification = () => {
        const pacBtn = document.querySelector('.pac-btn a')
        if (pacNotifi !== null && pacBtn !== null) {
            const pacId = pacNotifi.getAttribute('data-id')
            pacBtn.addEventListener('click', async () => {
                //Create a Local Storage to save the time
                const pacClosedTime = new Date().getTime() + (timeToSecond(pacpPublicData.pacp_settings.dismiss) * 1000);
                localStorage.setItem(`pacClosedTime-${pacId}`, pacClosedTime);
                dismissNotificationTimer() //Set Timer for the notification to show again

                if (pacNotifi.classList.contains('popup')) {
                    pacBtn.closest('dialog').close('close')
                } else if (pacNotifi.classList.contains('sticky')) {
                    pacNotifi.classList.toggle('hide')
                }
            })
        }
    }

    // update clicks
    const pacAnalytic = () => {

        const pacBtn = document.querySelector('.pac-btn a')
        const singleID = `post-${pacpPublicData.postID}`
        let currentClicks;
        if (pacNotifi !== null && pacBtn !== null) {
            const pacId = pacNotifi.getAttribute('data-id')
            const url = `${pacpPublicData.apiURL}/pop-and-convert/v1/notifications-stats/${pacId}`

            // Fetch current clicks
            const getClicks = async () => {
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    currentClicks = data.clicks ? data.clicks : 0;
                    return currentClicks;
                } catch (error) {
                    console.error('Error Fetching Clicks:', error);
                    return 0;
                }
            }
            currentClicks = getClicks();
            // Update clicks using navigator.sendBeacon
            async function updateClicks(newClicks) {
                try {
                    if (singleID !== pacId) {
                        const currentdata = await fetch(url);
                        const currentJson = await currentdata.json()
                        const updatedData = {
                            ...currentJson,
                            clicks: newClicks
                        }
                        const blob = new Blob([JSON.stringify(updatedData)], { type: 'application/json' });

                        navigator.sendBeacon(url, blob);
                    }
                } catch (error) {
                    console.error('Error Updating Clicks', error);
                }
            }

            // Event listener for the button
            pacBtn.addEventListener('click', async () => {
                const newClicks = currentClicks + 1;
                updateClicks(newClicks);
            });
        }

    }

    //Handle Sticky Notification Layout
    handleStickyButton();

    //Handle Pop Up Notification Layout 
    handlePopup();

    //Check the status of dismiss timer on every page load
    window.addEventListener('load', () => {
        dismissNotificationTimer()
    });

    //Close notification on btn click
    closePacNotification();

    //Add Focus Trap for accessibility
    focusTrap()

    //Update API on every Button Click for Analytics for non logged in user
    if (!pacpPublicData.loggedIn) pacAnalytic()
}
