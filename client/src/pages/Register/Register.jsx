import "./Register.css";
import { useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import { Link } from "react-router-dom";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setError(false);

		fetch("/api/auth/register", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				email: email,
				password: password
			})
		})
			.then(res => {
				if(!res.ok)
				{
					setError(true);
				}
				return res.json()
			})
			.then(data => {
				console.log(data);
			})
			.catch(err => {
				console.log(err);
			});
	}

	return (
		<>
			<Topbar />
			<img className="registerBgImg" src="https://c1.wallpaperflare.com/preview/1013/55/654/table-coffee-pen-fruit.jpg" alt="" />
			<div className="registerContainer">
				<span className="registerTitle">Register</span>
				<form className="registerForm" onSubmit={handleSubmit}>
					<label className={error ? "registerSubtitle registerError" : "registerSubtitle"}>Username</label>
					<input
						placeholder="Enter your Username..."
						type="text"
						className={error ?"registerInput registerInputError":"registerInput"}
						onChange={(e) => { setUsername(e.target.value) }}
					/>
					<label className={error ? "registerSubtitle registerError" : "registerSubtitle"}>Email</label>
					<input
						placeholder="Enter your email..."
						type="email"
						className={error ?"registerInput registerInputError":"registerInput"}
						onChange={(e) => { setEmail(e.target.value) }}
					/>
					<label className={error ? "registerSubtitle registerError" : "registerSubtitle"}>Password</label>
					<input
						placeholder="Enter your password..."
						type="password"
						className={error ?"registerInput registerInputError":"registerInput"}
						onChange={(e) => { setPassword(e.target.value) }}
					/>
					<button className="registerBtn">Register</button>
				</form>
				<button className="registerLoginBtn" type="submit">
					<Link className="link" to="/login">Register</Link>
				</button>
				{error && <span className="registerError">Something went wrong!</span>}
			</div>
		</>
	)
}

export default Register