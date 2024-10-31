import { QueryClient } from "@tanstack/react-query";
import React, { Suspense, lazy } from '@wordpress/element';
import { createHashRouter } from "react-router-dom";
import lazyRetry from "./lib/lazyRetry";
import ErrorBoundary from "./lib/ErrorBoundary";
import {
    createAction,
    editAction,
    editLoader,
    notificationsLoader
} from "./pages";

const Layout = lazy(() => lazyRetry(() => import("./ui/Layout"), "ui"));
const Welcome = lazy(() => lazyRetry(() => import('./pages/Welcome/index.js'), "welcome"));
const Notifications = lazy(() => lazyRetry(() => import('./pages/Notifications/ListNotifications/index.jsx'), "notifications"));
const CreateNotification = lazy(() => lazyRetry(() => import('./pages/Notifications/Notification.jsx'), 'createNotifications'));
const EditNotification = lazy(() => lazyRetry(() => import('./pages/Notifications/EditNotifications/index.jsx'), 'editNotificaitons'));

const queryClient = new QueryClient();

const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Suspense>
                    <Welcome />
                </Suspense>,
            },
            {
                path: "/notifications",

                element: <Suspense>
                    <Notifications />
                </Suspense>,
                loader: notificationsLoader(queryClient)
            },
            {
                path: "/notifications/create",
                element: <Suspense>
                    <CreateNotification />
                </Suspense>,
                action: createAction(queryClient),
            },
            {
                path: "/notifications/:id/edit",
                element: <Suspense>
                    <EditNotification />
                </Suspense>,
                loader: editLoader(queryClient),
                action: editAction(queryClient)
            },
        ],
        errorElement: <ErrorBoundary />
    },
];

const hashRouter = createHashRouter(routes);

export { hashRouter as default, queryClient };
