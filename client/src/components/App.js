import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Chat from './Chat/Chat';
import Join from './Join/Join';

const App = () => {
    return(
        <Router>
            <Route path="/join" exact component={Join} />
            <Route path="/chat" component={Chat} />
        </Router>
    );
}

export default App;