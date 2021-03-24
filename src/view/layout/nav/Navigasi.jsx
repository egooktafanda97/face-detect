import React from "react";
import "./css.scss";

const HeaderNav = () => {
  return (
    <div className='sidebar-top'>
      <div className='children'></div>
    </div>
  );
};

const NavItem = (props) => {
  return (
    <div className='M-navItems'>
      <div className={"C-navItems " + props.active}>
        <span className='fa fa-user'></span> <span>{props.title}</span>
      </div>
    </div>
  );
};

export default function Navigasi() {
  return (
    <div id='c-nav'>
      <div>
        <HeaderNav />
        <div className='s-title'></div>
        <NavItem title='Dashboard' />
        <NavItem title='Data Anak Pacu' active="active" />
        <NavItem title='Laporan' />
        <NavItem title='Pengaturan' />
        <NavItem title='Logout' />
      </div>
    </div>
  );
}
