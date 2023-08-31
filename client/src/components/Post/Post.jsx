import { Link } from 'react-router-dom';
import './Post.css';

const Post = ({post}) => {
  const PF = "http://localhost:5000/images/"
  return (
    <div className="post">
        <img className="postImg" src={PF + post.photo} alt=""/>
        <div className="categories">{post.categories.map((cat) => cat+" ")}</div>
        <Link to={`/post/${post._id}`} className="link"><div className="title">{post.title}</div></Link>
        
        <div className="createdAt">{new Date(post.createdAt).toDateString()}</div>
        <div className="postBody">{post.desc}</div>
    </div>
  )
}

export default Post