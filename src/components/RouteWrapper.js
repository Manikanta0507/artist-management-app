import React from 'react';
import App from '../App';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import DetailsContainerWrapper from './DetailsContainerWrapper';

const router = createBrowserRouter([

    {
        path: "/",
        Component: App,
    },
    {
        path: '/:id',
        Component: DetailsContainerWrapper
    }
]);

export const RouteWrapper = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default RouteWrapper