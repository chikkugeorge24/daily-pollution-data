import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useRedirect } from 'hookrouter';
import PollutionDataView from './Components/DataView/PollutionDataView';
import PollutionDataCheck from './Components/DataCheck/PollutionDataCheck';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Components/Graph/graph.css';
import './Components/DataView/DataView.css';

function App() {
  useRedirect("/", "/pollution-data-check");
  return (
      <Router>
        <div className="App">
          <Route path="/pollution-data-check" component={PollutionDataCheck} />
          <Route path="/pollution-data-view" component={PollutionDataView} />
        </div>
      </Router>
  );
}

export default App;
