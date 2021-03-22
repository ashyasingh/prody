import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Surveys from "./Surveys";
import NewSurveyPage from "./NewSurveyPage";

 const rootElement = document.getElementById("root");
 ReactDOM.render(
   <BrowserRouter>
    <Switch>
     <Route exact path="/" component={Surveys} />
     <Route path="/NewSurveyPage" component={NewSurveyPage} />
   </Switch>
   </BrowserRouter>,
   rootElement
   
 );