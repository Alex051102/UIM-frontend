import React from 'react';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Home from '../Home/Home';
import Habits from '../Habits/Habits';
import Food from '../Food/Food';
import Finance from '../Finance/Finance';
import BottomNav from '../../UI/BottomNav/BottomNav';
import './Main.css';
import homeBack from '../../../assets/homeBack.png';
export default function Main() {
  return (
    <>
      <div
        className="main-wrap"
        style={{ background: `url(${homeBack}) no-repeat`, backgroundSize: '100% 100%' }}>
        <div className="main">
          <div className="main__content">
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/habits" element={<Habits></Habits>}></Route>
              <Route path="/food" element={<Food></Food>}></Route>
              <Route path="/finance" element={<Finance></Finance>}></Route>
            </Routes>
          </div>

          <div className="main__nav">
            <BottomNav></BottomNav>
          </div>
        </div>
      </div>
    </>
  );
}
