import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { BASE_URL } from "../api/api";

const Write = () => {
  // will be used to check if we are in writing o edit mode
  const state = useLocation().state;
  //console.log("STATE",state)

  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const categories = [
    { value: "art", label: "Art" },
    { value: "science", label: "Science" },
    { value: "technology", label: "Technology" },
    { value: "cinema", label: "Cinema" },
    { value: "design", label: "Design" },
    { value: "food", label: "Food" },
  ];

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${BASE_URL}/upload`, formData);

      // Return the filename of the uploaded file
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Upload the image and get the filename
    const imgUrl = await upload();

    try {
      // Send a PUT request to update a post if the location state is defined (writing),
      // otherwise send a POST request to create a new post
      state
        ? await axios.put(
            `${BASE_URL}/post/${state.id}`,
            {
              title,
              description: value,
              cat,
              img: file ? imgUrl : "",
            },
            {
              withCredentials: true,
            }
          )
        : await axios.post(
            `${BASE_URL}/post/`,
            {
              title,
              description: value,
              cat,
              img: file ? imgUrl : "",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
              withCredentials: true,
            }
          );

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={setTitle}
        />
        <div className="editor-container">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Update</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          {categories.map((category) => (
            <div className="category" key={category.value}>
              <input
                type="radio"
                checked={cat === category.value}
                name="cat"
                value={category.value}
                id={category.value}
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor={category.value}>{category.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Write;
