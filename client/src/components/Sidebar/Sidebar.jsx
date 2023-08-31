import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [cat, setCat] = useState([]);

  useEffect(() => {
    fetch("/api/category")
      .then(res => {
        return res.json();
      })
      .then(data => {
        setCat(data);
        console.log(data);
      })
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <div className="sidebarTitle">ABOUT</div>
        <img className="sidebarImg" src="https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt=""/>
        <div className="sidebarText">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam totam consequuntur, doloremque cum repudiandae molestias? Fugit dolores voluptatibus sapiente iusto fuga architecto, accusamus in qui, sint voluptate molestiae ratione corporis.</div>
      </div>
      <div className="sidebarItem">
        <div className="sidebarTitle">CATEGORIES</div>
        <ul className="sidebarList">
          {cat.map((category) => (<li key={category._id} className="sidebarListItem"><Link to={`/?cat=${category.name}`} className="link">{category.name}</Link></li>))}        
        </ul>
      </div>
      <div className="sidebarItem">
        <div className="sidebarTitle">FOLLOW US</div>
        <div className="sidebarIconList">
          <i className="SidebarIcon fab fa-facebook-square"></i>
          <i className="SidebarIcon fab fa-twitter-square"></i>
          <i className="SidebarIcon fa-brands fa-square-pinterest"></i>
          <i className="SidebarIcon fa-brands fa-square-instagram"></i>
        </div>         
      </div>
    </div>
  )
}

export default Sidebar