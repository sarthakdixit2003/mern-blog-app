import { useContext, useState } from 'react';
import './Write.css';
import Topbar from '../../components/Topbar/Topbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Context } from '../../context/Context';

const Write = () => {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [file, setFile] = useState(null);
	const {user} = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newPost = {
			username: user.username,
			title,
			desc
		}
		if(file)
		{
			const data = new FormData();
			const filename = Date.now() + file.name;
			console.log("filename: ", filename);
			data.append("name", filename);
			data.append("file", file);
			newPost.photo = filename;
			
			fetch("/api/upload", {
				method: 'POST',
				body: data
			})
				.then(res => {return res.json()})
				.catch(err => console.log(err))
		}
		const response = await fetch("/api/posts", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newPost)
		})
		const fetchData = await response.json();
		console.log("fetch data:",fetchData);
		window.location.replace("/post/" + fetchData._id);
	}

	return (
		<>
			<Topbar />
			<div className="write">
				<div className="writeContainer">
				{ file &&
					<img 
						className="writeImg" 
						src={URL.createObjectURL(file)}
						alt="" 
					/>
				}
					<form className="writeForm" onSubmit={handleSubmit}>
						<div className="writeFormGroup">
							<label htmlFor="fileInput">
								<i className="writeIcon fa-solid fa-plus"></i>
							</label>
							<input type="file" id="fileInput" onChange={e => setFile(e.target.files[0])}/>
							<input type="text" placeholder="Title" className="writeInput" autoFocus={true} onChange={e => setTitle(e.target.value)} />
						</div>
						<div className="writeFormGroup">
							<textarea placeholder='Tell your story...' type="text" className="writeInput writeText" onChange={e => setDesc(e.target.value)}></textarea>
						</div>
						<button className="writeSubmit" type="submit">PUBLISH</button>
					</form>
				</div>
				<Sidebar />
			</div>
		</>
	)
}

export default Write