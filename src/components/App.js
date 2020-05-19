import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "../routes/Home";
import Detail from "../routes/Detail";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home}></Route>
      <Route path="/:id" component={Detail}></Route>
    </Router>
  );
}

export default App;

/*
 useEffect는 무조건 ComponentDidMount, ComponentWillUnMount, ComponentDidUpdate 임
 useEffect(function, []); 
 useEffect(function) -> 항상 이벤트 발생
 useEffect(function, []); -> [] 이벤트 발생 배열 체크 가능
 */
