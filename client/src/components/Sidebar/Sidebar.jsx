import React, { useState } from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBarIcon from "../icons/SideBarIcon";
import HomeIcon from "../icons/HomeIcon";
import VideoIcon from "../icons/VideoIcon";
import AuthIcon from "../icons/AuthIcon";
import CourseIcon from "../icons/CourseIcon";
import GroupIcon from "../icons/GroupIcon";
import ProfileIcon from "../icons/ProfileIcon";
import ExitIcon from "../icons/ExitIcon";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const user = useSelector((state) => state.auth.user);

  return (
    <div id="sidebar" className={`navbar${isOpen ? "" : " navbar--closed"}`}>
      <div className="navbar__header">
        <p className="navbar__title">System Content</p>
        <button onClick={() => setIsOpen(!isOpen)} className="navbar__button">
          <SideBarIcon name="side bar icon" />
        </button>
      </div>
      <nav className="navbar__navigation">
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link to="/" className="navbar__link">
              <HomeIcon />
              <p className="navbar__link-title">Главная</p>
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/videos" className="navbar__link">
              <VideoIcon />
              <p className="navbar__link-title">Видеоуроки</p>
            </Link>
          </li>
          {user.isAuthenticated && (
            <li className="navbar__item">
              <Link to="/profile" className="navbar__link">
                <ProfileIcon />
                <p className="navbar__link-title">Профиль</p>
              </Link>
            </li>
          )}
          {!user.isAuthenticated && (
            <li className="navbar__item">
              <Link to="/auth" className="navbar__link">
                <AuthIcon />
                <p className="navbar__link-title">Авторизация</p>
              </Link>
            </li>
          )}
          <li className="navbar__item">
            <Link to="/courses" className="navbar__link">
              <CourseIcon />
              <p className="navbar__link-title">Курсы и материалы</p>
            </Link>
          </li>
          {user.isAuthenticated && (
            <li className="navbar__item">
              <Link to="/groups" className="navbar__link">
                <GroupIcon />
                <p className="navbar__link-title">Группы</p>
              </Link>
            </li>
          )}
          {user.isAuthenticated && (
            <li className="navbar__item">
              <Link to="/logout" className="navbar__link">
                <ExitIcon />
                <p className="navbar__link-title">Выйти из аккаунта</p>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
