import sortBy from "sort-by";
import { matchSorter } from "match-sorter";
import axios from 'axios';

export async function getNotifications(query) {
    const url = `${pacpAdminData.apiURL}/pop-and-convert/v1/notifications`
    let notifications = await axios.get(url).then(res => res.data);
    if (!notifications) notifications = [];
    if (query) {
        notifications = matchSorter(notifications, query, { keys: ["title", "description"] });
    }
    return notifications.sort(sortBy("-updatedAt"));
}

export async function getNotification(id) {
    const url = `${pacpAdminData.apiURL}/pop-and-convert/v1/notifications/${id}`
    let notification = await axios.get(url).then(res => res.data); 
    return notification ?? null;
}

export async function getPostsDetails() {
    const postsURL = `${pacpAdminData.apiURL}/wp/v2/posts?per_page=100`
    let postsDetails = await axios.get(postsURL).then(res => res.data);
    const pageURL = `${pacpAdminData.apiURL}/wp/v2/pages?per_page=100`
    let pageDetails = await axios.get(pageURL).then(res => res.data);
    let mergedData = postsDetails.concat(pageDetails)
    return mergedData ?? null;
}

export async function getNotificationStats() {
    const url = `${pacpAdminData.apiURL}/pop-and-convert/v1/notifications-stats/`
    let stats = await axios.get(url).then(res => res.data);
    return stats ?? null;
}