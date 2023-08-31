import React from 'react';
import './Single.css';
import Topbar from '../../components/Topbar/Topbar';
import SinglePost from '../../components/SinglePost/SinglePost';
import Sidebar from '../../components/Sidebar/Sidebar';

const Single = () => {
  return (
    <>
      <Topbar />
      <div className="single">
        <SinglePost />
        <Sidebar />
    </div>
    </>
  )
}

export default Single