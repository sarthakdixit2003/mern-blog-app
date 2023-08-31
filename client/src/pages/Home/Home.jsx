import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './Home.css';
import Topbar from '../../components/Topbar/Topbar';
import Header from '../../components/Header/Header';
import Posts from '../../components/Posts/Posts';
import Sidebar from '../../components/Sidebar/Sidebar';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
  console.log(search);

  useEffect(() => {
    fetch(`/api/posts/${search}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        setPosts(data);
      })
      .catch(err => console.log(err))

  }, [search]);

  return (
    <>
      <Topbar />
      <Header />
      <div className="home">
        {posts && <Posts posts={posts} />}
        <Sidebar />
      </div>
    </>
  )
}

export default Home