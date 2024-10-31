import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getNotification } from "../../../store";
import NotificationForm from "../NotificationForm";
import axios from "axios";
const notificationDetailQuery = id => ({
    queryKey: ['notifications', id],
    queryFn: async () => {
        const notification = await getNotification(id)
        return notification
    }
})

export const loader = queryClient => async ({ params }) => {
    const query = notificationDetailQuery(params.id)
    return (
        queryClient.getQueryData(query.queryKey) ??
        (await queryClient.fetchQuery(query))
    )
}

export const action = (queryClient) => async ({ request, params }) => {
    const url = `${pacpAdminData.apiURL}/pop-and-convert/v1/notifications/${params.id}`
    let notification = await axios.get(url).then(res => res.data); 
    queryClient.invalidateQueries({ queryKey: ['notifications', 'all'] })
    return notification
}

export default function EditNotification() {
    
    const { id } = useParams()

    const { data: notification } = useQuery(notificationDetailQuery(id))

    return <NotificationForm notification={notification} />;
}
