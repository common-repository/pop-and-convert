import axios from 'axios';

export async function getNotificationsSettings() {
    const url = `${pacpAdminData.apiURL}/pop-and-convert/v1/notifications-settings`
    let notificationsSettings = await axios.get(url).then(res => res.data);
    if (!notificationsSettings) notificationsSettings = [];
    return notificationsSettings;
}