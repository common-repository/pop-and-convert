import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, Form, useLoaderData, useNavigate } from "react-router-dom";
import { __ } from "@wordpress/i18n";
import { Icon } from "../../../components";
import NotificationsTable from "./NotificationsTable";
import { getNotifications } from "../../../store";

const notificationsListQuery = (q) => ({
    queryKey: ["notifications", q ?? "all"],
    queryFn: () => getNotifications(q),
})

export function loader(queryClient) {
    return async function ({ request }) {
        const url = new URL(request.url);
        const q = url.searchParams.get("q");

        if (!queryClient.getQueryData(notificationsListQuery(q).queryKey)) {
            await queryClient.fetchQuery(notificationsListQuery(q))
        }

        return { q };
    }
}

export default function Notifications() {

    const { q } = useLoaderData();

    const [searchQuery, setSearchQuery] = useState(q || "");

    const { data: items, isFetching } = useQuery(notificationsListQuery(q))

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    }
    
    useEffect(() => {
        const getSearchQuery = setTimeout(() => {
            navigate(`/notifications?q=${searchQuery}`)
        }, 1000)
        return () => clearTimeout(getSearchQuery)
    }, [searchQuery])

    return (
        <div className="container flex flex-col gap-6 py-8 pl-7 pr-6 2xl:pl-0 2xl:pr-0">
            <div className="flex justify-between">
                <h3 className="font-semibold text-2xl">{__('All Notifications', 'pop-and-convert')}</h3>
                <div className="flex gap-4">
                    <div className="relative">
                        <span className="absolute h-full w-11 flex justify-center items-center">
                            <Icon icon="search" />
                        </span>
                        <Form role="search">
                            <input
                                className="!py-2.5 !pl-11 !pr-4 border !border-border-color shadow text-sm !leading-[1.7]"
                                style={{ width: "320px" }}
                                type="search"
                                name="q"
                                placeholder={__("What are you looking for ...", 'pop-and-convert')}
                                value={searchQuery}
                                onChange={handleInputChange}
                            />
                        </Form>
                    </div>
                    <div className="pac-button">
                        <Link to="/notifications/create" className="btn-primary">
                            {__('Add Notification', 'pop-and-convert')}
                        </Link>
                    </div>
                </div>
            </div>
            <NotificationsTable items={items} loading={isFetching} searchQuery={searchQuery}/>
        </div>
    );
}
