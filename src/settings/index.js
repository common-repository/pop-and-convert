import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import hashRouter from "./router";
import { Toaster } from "sonner";

const root = createRoot(document.getElementById('pacp-global-settings'))

root.render(
	<>
		<RouterProvider router={hashRouter} />
		<Toaster closeButton richColors />

	</>
)