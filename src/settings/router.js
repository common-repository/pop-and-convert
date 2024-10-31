import { createHashRouter } from "react-router-dom";
import React, { Suspense, lazy } from '@wordpress/element';
import lazyRetry from "../admin/app/lib/lazyRetry";
import ErrorBoundary from "../admin/app/lib/ErrorBoundary";

const Layout = lazy(() => lazyRetry(() => import('../admin/app/ui/Layout'), "navbarsettings"));
const Settings = lazy(() => lazyRetry(() => import("./Pages/Setting/index"), "settings"));
const routes = [
    {
        path: "/",
        element: <Suspense>
            <Layout pointer="none"/>
        </Suspense>,
        children: [
            {
                path: "/",
                element: <Suspense>
                    <Settings />
                </Suspense>
            },
        ],
        errorElement: <ErrorBoundary />

    },
];

const hashRouter = createHashRouter(routes);

export { hashRouter as default };