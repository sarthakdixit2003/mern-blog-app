import './Settings.css';
import Topbar from '../../components/Topbar/Topbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';

const Settings = () => {
	const { user, dispatch } = useContext(Context);
	const [file, setFile] = useState(null);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState(false);
	const PF = "http://localhost:5000/images/";

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "UPDATE_START" });
		const updatedUser = {
			userId: user._id,
			username,
			email,
			password
		}
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			console.log("filename: ", filename);
			data.append("name", filename);
			data.append("file", file);
			updatedUser.profile = filename;

			fetch("/api/upload", {
				method: 'POST',
				body: data
			})
				.then(res => { return res.json() })
				.catch(err => console.log(err))
		}
		const response = await fetch(`/api/users/${user._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updatedUser)
		})
		const fetchData = await response.json();
		dispatch({ type: "UPDATE_SUCCESS", payload: fetchData });
		setSuccess(true);
		console.log("fetch data:", fetchData);
	}

	return (
		<>
			<Topbar />
			<div className="settingsContainer">
				<div className="settings">
					<div className="settingsTitle">
						<h1>Update Your Account</h1>
						<p className="settingsTitleSecondary">Delete Account</p>
					</div>
					<form className="settingsForm" onSubmit={handleSubmit}>
						<div className="settingsFormGroup">
							<div className="settingsSubtitle">Profile Picture</div>
							<div className="settingsProfile">
								<img className="settingsProfileImg" src={file ? URL.createObjectURL(file) : PF + user.profile} alt="" />
								<label htmlFor='settingsFileInput'>
									<i class="settingsIcon fa-regular fa-user"></i>
								</label>
								<input id="settingsFileInput" type="file" onChange={e => setFile(e.target.files[0])} />
							</div>
						</div>
						<div className="settingsFormGroup">
							<div className="settingsSubtitle">Username</div>
							<input placeholder={user.username} type="text" className="settingsInput" onChange={e => setUsername(e.target.value)} />
						</div>
						<div className="settingsFormGroup">
							<div className="settingsSubtitle">Email</div>
							<input placeholder={user.email} type="email" className="settingsInput" onChange={e => setEmail(e.target.value)} />
						</div>
						<div className="settingsFormGroup">
							<div className="settingsSubtitle">Password</div>
							<input placeholder="Password" type="password" className="settingsInput" onChange={e => setPassword(e.target.value)} />
						</div>
						<button className="settingsBtn" type="submit">Update</button>
					</form>
					{success && <div className="settingsSuccess">Profile has been updated...</div>}
				</div>
				<Sidebar />
			</div>
		</>
	)
}

export default Settings