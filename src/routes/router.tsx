import React from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";

export const Example = React.lazy(() => import("@/pages/Example/Page"));
export const routeList: RouteObject[] = [
  {
    id: "root",
    path: "/",
    children: [{ path: "/", element: <Example /> }],
  },
];
export const router = createBrowserRouter(routeList);
