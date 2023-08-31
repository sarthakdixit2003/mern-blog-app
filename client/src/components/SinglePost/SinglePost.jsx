import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import './SinglePost.css';
import { Context } from '../../context/Context';

const SinglePost = () => {
  const PF = "http://localhost:5000/images/";
  const {user} = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [post, setPost] = useState([]);

  const {id} = useParams();

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(res => { return res.json() })
      .then(data => {
        setPost(data);
        setTitle(data.title);
        setDesc(data.desc);
        console.log(data);
      })
  }, [id]);

  const handleDelete = async () => {
    await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user.username
      })
    })
      .then(res => {return res.json()})
      .then(data => {
        console.log(data);
        window.location.replace("/");
      })
      .catch(err => console.log(err))
  }

  const handleUpdate = async () => {
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        desc: desc
      })
    })
      .then(res => {return res.json()})
      .then(data => {
        console.log(data);
        setUpdateMode(false);
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="singlePost">
      <img className="singlePostImg" src={PF + post.photo} alt="" />
      {updateMode ? <input type="text" value={title} className="singlePostTitleInput" onChange={(e) => setTitle(e.target.value)}/> :  
      <div className="singlePostTitle">
        <div className="singlePostHeading">{title}</div>
        {post.username === user?.username &&
          (<div className="singlePostEdit">
            <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
            <i className="singlePostIcon fa-regular fa-trash-can" onClick={handleDelete}></i>
          </div>)
        }
      </div>}
      <div className="singlePostSubtitle">
        <div className="singlePostAuthor">
          Author: 
          <b><Link to={`/?user=${post.username}`} className="link">{post.username}</Link></b>
        </div>
        <div className="singlePostcreatedAt">{new Date(post.createdAt).toDateString()}</div>
      </div>
      {updateMode ? <textarea value={desc} className="singlePostBodyInput" onChange={(e) => setDesc(e.target.value)}/> :
        <div className="singlePostBody">{desc}</div>
      }
      {updateMode && <button className="singlePostBtn" onClick={handleUpdate}>Update</button>}
    </div>
  )
}

export default SinglePost