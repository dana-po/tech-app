import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { FaTimes } from 'react-icons/fa';
import { links } from '../utils/constants';
import CartButtons from './CartButtons';
import { useUserContext } from '../context/user_context';
import './Sidebar.css';

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useProductsContext();
  const { myUser } = useUserContext();
  return (
    <div className="sidebar-container">
      <aside
        className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}
      >
        <div className="sidebar-header">
        <Logo/>
          <button className="close-btn" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>
        <ul className="links">
          {links.map(({ id, text, url }) => {
            return (
              <li key={id}>
                <Link to={url} onClick={closeSidebar}>
                  {text}
                </Link>
              </li>
            );
          })}
          {/* if user exist render the list */}
          {myUser && (
            <li>
              <Link to="/checkout" onClick={closeSidebar}>
                checkout
              </Link>
            </li>
          )}
        </ul>
        <CartButtons />
      </aside>
    </div>
  );
};

export default Sidebar;
