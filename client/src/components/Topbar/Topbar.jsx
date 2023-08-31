import { Link } from 'react-router-dom';
import './Topbar.css';
import { useContext } from 'react';
import { Context } from '../../context/Context';

const Topbar = () => {
	const { user, dispatch } = useContext(Context);
	const PF = "http://localhost:5000/images/";
	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
	}
  return (
    <div className="top">
      <div className="topLeft">
				<i className="topLeftIcon fab fa-facebook-square"></i>
				<i className="topLeftIcon fab fa-twitter-square"></i>
				<i className="topLeftIcon fa-brands fa-square-pinterest"></i>
				<i className="topLeftIcon fa-brands fa-square-instagram"></i>
			</div>
			<div className="topCenter">
				<ul className="topList">
					<li className="topListItem">
						<Link className="link" to="/">HOME</Link>
					</li>
					<li className="topListItem">
						<Link className="link" to="/">ABOUT</Link>
					</li>
					<li className="topListItem">
						<Link className="link" to="/">CONTACT</Link>
					</li>
					<li className="topListItem">
						<Link className="link" to="/write">WRITE</Link>
					</li>
					<li className="topListItem" onClick={handleLogout}>
						{user && "LOGOUT"}
					</li>
				</ul>
			</div>
			<div className="topRight">
				{	
					user ? 
					<Link to="/settings" className="link"><img className="topImg" src={PF + user.profile} alt=""/></Link> :
					<ul className="topList">
						<li className="topListItem">
							<Link className="link" to="/login">LOGIN</Link>
						</li>
						<li className="topListItem">
							<Link className="link" to="/register">REGISTER</Link>
						</li>
					</ul>
				}
				
				<i className="searchIcn fa-solid fa-magnifying-glass"></i>
			</div>
    </div>
  )
}

export default Topbar