import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from "./home_page"
export default () => (
    <div>
        <Route path="/" component={HomePage} />
    </div>
);