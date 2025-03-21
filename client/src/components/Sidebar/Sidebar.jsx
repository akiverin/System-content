import React, { useState } from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div id="sidebar" className={`navbar${isOpen ? "" : " navbar--closed"}`}>
      <div className="navbar__header">
        <p className="navbar__title">System Content</p>
        <button onClick={() => setIsOpen(!isOpen)} className="navbar__button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M6.416 3A4.416 4.416 0 0 0 2 7.416v8.833a4.416 4.416 0 0 0 4.416 4.417h11.168A4.416 4.416 0 0 0 22 16.248V7.416A4.416 4.416 0 0 0 17.584 3zm3.228 1.767v14.132h7.94a2.65 2.65 0 0 0 2.65-2.65V7.416a2.65 2.65 0 0 0-2.65-2.65h-7.94Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <nav className="navbar__navigation">
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link to="/" className="navbar__link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path fill="url(#fluentColorHome240)" d="M9 13h6v8H9z" />
                  <path
                    fill="url(#fluentColorHome241)"
                    d="M13.45 4.533a2.25 2.25 0 0 0-2.9 0L3.8 10.228a2.25 2.25 0 0 0-.8 1.72v7.305c0 .966.784 1.75 1.75 1.75H9.5V15.25c0-.68.542-1.232 1.217-1.25h2.566a1.25 1.25 0 0 1 1.217 1.25v5.753h4.75a1.75 1.75 0 0 0 1.75-1.75v-7.305a2.25 2.25 0 0 0-.8-1.72z"
                  />
                  <path
                    fill="url(#fluentColorHome242)"
                    fill-rule="evenodd"
                    d="M12.804 2.299a1.23 1.23 0 0 0-1.608 0l-8.789 7.63a1.167 1.167 0 0 0-.102 1.672a1.23 1.23 0 0 0 1.711.1L12 4.771l7.984 6.93c.5.435 1.266.39 1.71-.1a1.167 1.167 0 0 0-.101-1.673z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill="url(#fluentColorHome243)"
                    fill-rule="evenodd"
                    d="M11.196 2.299a1.23 1.23 0 0 1 1.608 0l8.789 7.63c.5.434.546 1.183.102 1.672a1.23 1.23 0 0 1-1.711.1L12 4.771L4.016 11.7a1.23 1.23 0 0 1-1.71-.1a1.167 1.167 0 0 1 .101-1.673z"
                    clip-rule="evenodd"
                  />
                  <defs>
                    <linearGradient
                      id="fluentColorHome240"
                      x1="12"
                      x2="6.707"
                      y1="13"
                      y2="21.825"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#944600" />
                      <stop offset="1" stop-color="#CD8E02" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorHome241"
                      x1="4.718"
                      x2="21.568"
                      y1="3.172"
                      y2="17.673"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FFD394" />
                      <stop offset="1" stop-color="#FFB357" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorHome242"
                      x1="8.768"
                      x2="13.162"
                      y1="-.375"
                      y2="11.505"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FF921F" />
                      <stop offset="1" stop-color="#EB4824" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorHome243"
                      x1="8.768"
                      x2="13.162"
                      y1="-.375"
                      y2="11.505"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FF921F" />
                      <stop offset="1" stop-color="#EB4824" />
                    </linearGradient>
                  </defs>
                </g>
              </svg>
              <p className="navbar__link-title">Главная</p>
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/" className="navbar__link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    fill="url(#fluentColorVideo240)"
                    d="m11 12l8.255-5.704c1.161-.802 2.745.03 2.745 1.44v8.528c0 1.41-1.584 2.242-2.745 1.44z"
                  />
                  <path
                    fill="url(#fluentColorVideo242)"
                    fill-opacity=".75"
                    d="m11 12l8.255-5.704c1.161-.802 2.745.03 2.745 1.44v8.528c0 1.41-1.584 2.242-2.745 1.44z"
                  />
                  <path
                    fill="url(#fluentColorVideo241)"
                    d="M2 8.25A3.25 3.25 0 0 1 5.25 5h6.5A3.25 3.25 0 0 1 15 8.25v7.5A3.25 3.25 0 0 1 11.75 19h-6.5A3.25 3.25 0 0 1 2 15.75z"
                  />
                  <path
                    fill="url(#fluentColorVideo243)"
                    d="M4 15a2 2 0 0 1 2-2h5a2 2 0 1 1 0 4H6a2 2 0 0 1-2-2"
                    opacity=".5"
                  />
                  <path
                    fill="#BABAFF"
                    d="M6 14a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2zm5 2a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
                  />
                  <defs>
                    <radialGradient
                      id="fluentColorVideo240"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientTransform="matrix(5 18.50003 -31.06105 8.39487 17 3)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset=".081" stop-color="#F08AF4" />
                      <stop offset=".394" stop-color="#9C6CFE" />
                      <stop offset="1" stop-color="#4E44DB" />
                    </radialGradient>
                    <radialGradient
                      id="fluentColorVideo241"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientTransform="rotate(44.73 -6.966 2.35)scale(21.0535 44.2355)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#F08AF4" />
                      <stop offset=".341" stop-color="#9C6CFE" />
                      <stop offset="1" stop-color="#4E44DB" />
                    </radialGradient>
                    <linearGradient
                      id="fluentColorVideo242"
                      x1="14.056"
                      x2="21.993"
                      y1="12"
                      y2="11.767"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#312A9A" />
                      <stop offset="1" stop-color="#312A9A" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorVideo243"
                      x1="3.796"
                      x2="5.154"
                      y1="13"
                      y2="18.344"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#3B148A" />
                      <stop offset="1" stop-color="#4B20A0" />
                    </linearGradient>
                  </defs>
                </g>
              </svg>
              <p className="navbar__link-title">Видеоуроки</p>
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/profile" className="navbar__link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    fill="url(#fluentColorPerson240)"
                    d="M17.754 14a2.25 2.25 0 0 1 2.249 2.249v.918a2.75 2.75 0 0 1-.513 1.6C17.945 20.93 15.42 22 12 22s-5.944-1.072-7.486-3.236a2.75 2.75 0 0 1-.51-1.596v-.92A2.25 2.25 0 0 1 6.251 14z"
                  />
                  <path
                    fill="url(#fluentColorPerson241)"
                    d="M17.754 14a2.25 2.25 0 0 1 2.249 2.249v.918a2.75 2.75 0 0 1-.513 1.6C17.945 20.93 15.42 22 12 22s-5.944-1.072-7.486-3.236a2.75 2.75 0 0 1-.51-1.596v-.92A2.25 2.25 0 0 1 6.251 14z"
                  />
                  <path
                    fill="url(#fluentColorPerson242)"
                    d="M12 2.005a5 5 0 1 1 0 10a5 5 0 0 1 0-10"
                  />
                  <defs>
                    <linearGradient
                      id="fluentColorPerson240"
                      x1="7.808"
                      x2="10.394"
                      y1="15.064"
                      y2="23.319"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset=".125" stop-color="#9C6CFE" />
                      <stop offset="1" stop-color="#7A41DC" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorPerson241"
                      x1="12.003"
                      x2="15.623"
                      y1="13.047"
                      y2="26.573"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#885EDB" stop-opacity="0" />
                      <stop offset="1" stop-color="#E362F8" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorPerson242"
                      x1="9.379"
                      x2="14.475"
                      y1="3.334"
                      y2="11.472"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset=".125" stop-color="#9C6CFE" />
                      <stop offset="1" stop-color="#7A41DC" />
                    </linearGradient>
                  </defs>
                </g>
              </svg>
              <p className="navbar__link-title">Профиль</p>
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/auth" className="navbar__link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    fill="#D9D9D9"
                    d="M12 2a4 4 0 0 0-4 4v1.5h1.5V6a2.5 2.5 0 0 1 5 0v1.5H16V6a4 4 0 0 0-4-4"
                  />
                  <path
                    fill="url(#fluentColorLockClosed240)"
                    d="M12 2a4 4 0 0 0-4 4v1.5h1.5V6a2.5 2.5 0 0 1 5 0v1.5H16V6a4 4 0 0 0-4-4"
                  />
                  <path
                    fill="#D9D9D9"
                    d="M20 10.25A3.25 3.25 0 0 0 16.75 7h-9.5A3.25 3.25 0 0 0 4 10.25v7.5A3.25 3.25 0 0 0 7.25 21h9.5A3.25 3.25 0 0 0 20 17.75z"
                  />
                  <path
                    fill="url(#fluentColorLockClosed241)"
                    d="M20 10.25A3.25 3.25 0 0 0 16.75 7h-9.5A3.25 3.25 0 0 0 4 10.25v7.5A3.25 3.25 0 0 0 7.25 21h9.5A3.25 3.25 0 0 0 20 17.75z"
                  />
                  <path
                    fill="#212121"
                    d="M12 15.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
                  />
                  <path
                    fill="url(#fluentColorLockClosed242)"
                    d="M12 15.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
                  />
                  <defs>
                    <linearGradient
                      id="fluentColorLockClosed240"
                      x1="9.714"
                      x2="15.835"
                      y1=".949"
                      y2="11.057"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FFC205" />
                      <stop offset="1" stop-color="#FB5937" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorLockClosed241"
                      x1="21.143"
                      x2="6.542"
                      y1="21.875"
                      y2="8.278"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FF6F47" />
                      <stop offset="1" stop-color="#FFCD0F" />
                    </linearGradient>
                    <radialGradient
                      id="fluentColorLockClosed242"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientTransform="matrix(-1.49996 -5.25 7.28439 -2.0812 12.75 15.5)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#944600" />
                      <stop offset="1" stop-color="#CD8E02" />
                    </radialGradient>
                  </defs>
                </g>
              </svg>
              <p className="navbar__link-title">Авторизация</p>
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/" className="navbar__link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    fill="url(#fluentColorLibrary240)"
                    d="M5.5 3A1.5 1.5 0 0 1 7 4.5v15A1.5 1.5 0 0 1 5.5 21h-2A1.5 1.5 0 0 1 2 19.5v-15A1.5 1.5 0 0 1 3.5 3z"
                  />
                  <path
                    fill="url(#fluentColorLibrary241)"
                    d="M11.5 3A1.5 1.5 0 0 1 13 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 8 19.5v-15A1.5 1.5 0 0 1 9.5 3z"
                  />
                  <path
                    fill="url(#fluentColorLibrary242)"
                    d="m21.995 18.643l-3.214-12.52a1.5 1.5 0 0 0-1.826-1.08l-1.876.484A1.5 1.5 0 0 0 14 7.353l3.214 12.517a1.5 1.5 0 0 0 1.826 1.08l1.876-.481a1.5 1.5 0 0 0 1.08-1.826"
                  />
                  <path fill="url(#fluentColorLibrary243)" d="M2 6h5v2H2z" />
                  <path
                    fill="url(#fluentColorLibrary244)"
                    d="m14.982 11.18l4.785-1.218l-.498-1.937l-4.785 1.218z"
                  />
                  <path fill="url(#fluentColorLibrary245)" d="M13 6H8v2h5z" />
                  <defs>
                    <linearGradient
                      id="fluentColorLibrary240"
                      x1="-1.75"
                      x2="2.7"
                      y1="3"
                      y2="26.492"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#43E5CA" />
                      <stop offset="1" stop-color="#2764E7" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorLibrary241"
                      x1="-1.75"
                      x2="2.7"
                      y1="3"
                      y2="26.492"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#43E5CA" />
                      <stop offset="1" stop-color="#2764E7" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorLibrary242"
                      x1="-1.75"
                      x2="2.7"
                      y1="3"
                      y2="26.492"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#43E5CA" />
                      <stop offset="1" stop-color="#2764E7" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorLibrary243"
                      x1="8"
                      x2="13.97"
                      y1="2.178"
                      y2="4.427"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#9FF0F9" />
                      <stop offset="1" stop-color="#6CE0FF" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorLibrary244"
                      x1="8"
                      x2="13.97"
                      y1="2.178"
                      y2="4.427"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#9FF0F9" />
                      <stop offset="1" stop-color="#6CE0FF" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorLibrary245"
                      x1="8"
                      x2="13.97"
                      y1="2.178"
                      y2="4.427"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#9FF0F9" />
                      <stop offset="1" stop-color="#6CE0FF" />
                    </linearGradient>
                  </defs>
                </g>
              </svg>
              <p className="navbar__link-title">Курсы и материалы</p>
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/" className="navbar__link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    fill="url(#fluentColorClipboardTextEdit240)"
                    d="M6 4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9.546L20 15.875V6a2 2 0 0 0-2-2z"
                  />
                  <path
                    fill="url(#fluentColorClipboardTextEdit241)"
                    fill-opacity=".9"
                    d="M8 9a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2z"
                  />
                  <path
                    fill="url(#fluentColorClipboardTextEdit242)"
                    fill-opacity=".9"
                    d="M8 13a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2z"
                  />
                  <path
                    fill="url(#fluentColorClipboardTextEdit243)"
                    fill-opacity=".9"
                    d="M7 18a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1"
                  />
                  <path
                    fill="url(#fluentColorClipboardTextEdit249)"
                    fill-opacity=".4"
                    d="M5.5 4A1.5 1.5 0 0 0 4 5.5v15A1.5 1.5 0 0 0 5.5 22h7.928L20 16.507V5.5A1.5 1.5 0 0 0 18.5 4z"
                  />
                  <path
                    fill="url(#fluentColorClipboardTextEdit24a)"
                    fill-opacity=".4"
                    d="M5.5 4A1.5 1.5 0 0 0 4 5.5v15A1.5 1.5 0 0 0 5.5 22h7.928L20 16.507V5.5A1.5 1.5 0 0 0 18.5 4z"
                  />
                  <path
                    fill="url(#fluentColorClipboardTextEdit24b)"
                    fill-opacity=".4"
                    d="M5.5 4A1.5 1.5 0 0 0 4 5.5v15A1.5 1.5 0 0 0 5.5 22h7.928L20 16.507V5.5A1.5 1.5 0 0 0 18.5 4z"
                  />
                  <path
                    fill="url(#fluentColorClipboardTextEdit244)"
                    d="M8 4a2 2 0 0 0 2 2h4a2 2 0 1 0 0-4h-4a2 2 0 0 0-2 2"
                  />
                  <path
                    fill="url(#fluentColorClipboardTextEdit245)"
                    d="M20.585 14.456h-3.241l-4.142 4.146a3 3 0 0 0-.178.196v3.208h3.25a3 3 0 0 0 .171-.157l4.14-4.144z"
                  />
                  <path
                    fill="url(#fluentColorClipboardTextEdit246)"
                    d="M16.28 21.998a2.7 2.7 0 0 1-1.087.556l-1.837.46a1.09 1.09 0 0 1-1.322-1.324l.459-1.84a2.7 2.7 0 0 1 .534-1.06a4.3 4.3 0 0 0 3.252 3.208"
                  />
                  <path
                    fill="url(#fluentColorClipboardTextEdit247)"
                    d="m17.574 14.235l1.56-1.562a2.29 2.29 0 0 1 3.244 0c.896.896.896 2.35 0 3.246l-1.44 1.443z"
                  />
                  <path
                    fill="url(#fluentColorClipboardTextEdit248)"
                    d="M21.824 16.477a4.3 4.3 0 0 1-3.262-3.249l-1.227 1.228a4.3 4.3 0 0 0 3.263 3.249z"
                  />
                  <defs>
                    <linearGradient
                      id="fluentColorClipboardTextEdit240"
                      x1="4"
                      x2="18.146"
                      y1="5.8"
                      y2="23.483"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#36DFF1" />
                      <stop offset="1" stop-color="#0094F0" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorClipboardTextEdit241"
                      x1="13.25"
                      x2="5.852"
                      y1="19"
                      y2="9.937"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#9DEAFF" />
                      <stop offset="1" stop-color="#fff" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorClipboardTextEdit242"
                      x1="13.25"
                      x2="5.852"
                      y1="19"
                      y2="9.937"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#9DEAFF" />
                      <stop offset="1" stop-color="#fff" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorClipboardTextEdit243"
                      x1="13.25"
                      x2="5.852"
                      y1="19"
                      y2="9.937"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#9DEAFF" />
                      <stop offset="1" stop-color="#fff" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorClipboardTextEdit244"
                      x1="12"
                      x2="12"
                      y1="6"
                      y2="2"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FAB500" />
                      <stop offset="1" stop-color="#FFE06B" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorClipboardTextEdit245"
                      x1="15.03"
                      x2="18.73"
                      y1="16.308"
                      y2="20.018"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FFA43D" />
                      <stop offset="1" stop-color="#FB5937" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorClipboardTextEdit246"
                      x1="11.387"
                      x2="14.456"
                      y1="19.976"
                      y2="23.042"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset=".255" stop-color="#FFD394" />
                      <stop offset="1" stop-color="#FF921F" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorClipboardTextEdit247"
                      x1="21.904"
                      x2="19.926"
                      y1="13.116"
                      y2="15.016"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#F97DBD" />
                      <stop offset="1" stop-color="#DD3CE2" />
                    </linearGradient>
                    <linearGradient
                      id="fluentColorClipboardTextEdit248"
                      x1="19.657"
                      x2="16.488"
                      y1="16.292"
                      y2="14.902"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FF921F" />
                      <stop offset="1" stop-color="#FFE994" />
                    </linearGradient>
                    <radialGradient
                      id="fluentColorClipboardTextEdit249"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientTransform="matrix(-6.5 0 0 -7.75283 12 .5)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset=".056" stop-color="#0A1852" />
                      <stop offset="1" stop-color="#0A1852" stop-opacity="0" />
                    </radialGradient>
                    <radialGradient
                      id="fluentColorClipboardTextEdit24a"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientTransform="matrix(-6.5 0 0 -8.40275 12 .5)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset=".056" stop-color="#0A1852" />
                      <stop offset="1" stop-color="#0A1852" stop-opacity="0" />
                    </radialGradient>
                    <radialGradient
                      id="fluentColorClipboardTextEdit24b"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientTransform="matrix(-7.49998 6.99996 -3.13742 -3.36153 17.5 17)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#0A1852" />
                      <stop offset="1" stop-color="#0A1852" stop-opacity="0" />
                    </radialGradient>
                  </defs>
                </g>
              </svg>
              <p className="navbar__link-title">Задания и тесты</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
