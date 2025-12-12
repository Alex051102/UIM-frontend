import React from 'react';
import habits from '../../../assets/habitsNav.svg';
import home from '../../../assets/homeNav.svg';
import './BottomNav.css';
import { Link } from 'react-router-dom';
export default function BottomNav() {
  return (
    <>
      <div className="bottom-nav-wrap">
        <div className="botton-nav">
          <Link to="/habits" className="bottom-nav__item">
            <img src={habits} alt="" />
          </Link>
          <Link to="/" className="bottom-nav__item">
            <img src={home} alt="" />
          </Link>
          <Link to="/finance" className="bottom-nav__item">
            <img src={habits} alt="" />
          </Link>
          <Link to="/food" className="bottom-nav__item">
            <img src={home} alt="" />
          </Link>
        </div>
      </div>
    </>
  );
}
