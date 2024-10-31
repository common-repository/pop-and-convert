import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import hashRouter, { queryClient } from "./app/router";
import { Loading } from "./app/components";
import { Suspense } from '@wordpress/element';
import { Toaster } from "sonner";

import './scss/index.css'

const root = createRoot(document.getElementById('pop-and-convert'))

root.render(
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={hashRouter} />
		<Toaster closeButton richColors/>
	</QueryClientProvider>
)
