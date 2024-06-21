import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api/api";
import axios from "axios";
import { Link } from "react-router-dom";

const Menu = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/post`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [setPosts]);

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`${BASE_URL}/images/${post.img}`} alt="post cover" />
          <h2>{post.title}</h2>
          <Link to={`/post/${post.id}`}>
            <button>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
