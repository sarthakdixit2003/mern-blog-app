import './Login.css';
import Topbar from '../../components/Topbar/Topbar';
import { Link } from 'react-router-dom';
import { useRef, useContext } from 'react';
import { Context } from '../../context/Context';

const Login = () => {
	const userRef = useRef();
	const passwordRef = useRef();
	const { dispatch, isFetching } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "LOGIN_START" });
		
		try {
			const response = await fetch("/api/auth/login", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: userRef.current.value,
					password: passwordRef.current.value
				})
			});

			const data = await response.json();
			dispatch({ type: "LOGIN_SUCCESS", payload: data });
			console.log(data);

		} catch (error) {
			console.error("Error:", error);
			dispatch({ type: "LOGIN_FAILURE" });
		}
	};
	
	return (
		<>
			<Topbar />
			<img className="loginBgImg" src="https://wallpaperaccess.com/full/5668712.jpg" alt="" />
			<div className="loginContainer">
				<span className="loginTitle">Login</span>
				<form className="loginForm" onSubmit={handleSubmit}>
					<label className="loginSubtitle">Username</label>
					<input
						placeholder="Enter your username..."
						type="text"
						className="loginInput"
						ref={userRef}
					/>
					<label className="loginSubtitle">Password</label>
					<input
						placeholder="Enter your password..."
						type="password"
						className="loginInput"
						ref={passwordRef}
					/>
					<button 
						className="loginBtn" 
						type="submit"
						disabled={isFetching}
					>
						Login
					</button>
				</form>
				<button className="loginRegisterBtn">
					<Link className="link" to="/register">Register</Link>
				</button>
			</div>
		</>
	)
}

export default Login