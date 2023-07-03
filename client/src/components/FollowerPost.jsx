import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"
import Spinner from "./Spinner";

let PostList = () => {
  let [localPost, setLocalPost] = useState({
    text: "",
    image: "",
  });

  let navigate=useNavigate();
  let [user,setUser] = useState({});
  let [posts, setPosts] = useState({});
  let [loading,setLoading] = useState(true);
  let [loggedIn,setLoggedIn]=useState(false);
  let[profile, setProfile]=  useState({})
 useEffect(() => {
   if (!localStorage.getItem("devroom")) {
     navigate("/users/login");
   }
   setLoggedIn(true);
 }, []);

  function timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      if (elapsed / 1000 < 30) return "Just now";

      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      return Math.round(elapsed / msPerYear) + " years ago";
    }
  }


   const getUser = async () => {
     let { data } = await axios.get("https://devroom-hfgx.onrender.com/api/users/me", {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${localStorage.getItem("devroom")}`,
       },
     });
     setUser(data.user);
     console.log(data.user);
   };

   const getProfile = async() =>{
    let {status,data} = await axios.get("https://devroom-hfgx.onrender.com/api/profiles/me",{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("devroom")}`,
      },
    })

    //  console.log(data)
    console.log(status)
    // setCreate(status);
    // console.log(create);
    if (status==200) setProfile(data.profile);


    else {
        Swal.fire("Create Profile","", "warning");

        navigate("/profiles/create-profile");
    }
    
    
    
     console.log(profile);
    console.log(profile.Following)
    // console.log(profile.Follower)
  }


    const getPosts = async () => {
      let { data } = await axios.get("https://devroom-hfgx.onrender.com/api/posts/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("devroom")}`,
        },
      });
      setPosts(data.posts);
      console.log(data.posts);
      setLoading(false);
    };


  useEffect(() => {
    if (loggedIn) {
        

        getProfile();
        getUser().then(() => {
            
        getPosts();
      });
    }
  }, [loggedIn]);

  let updateInput = (e) => {
    setLocalPost({
      ...localPost,
      [e.target.name]: e.target.value,
    });
  };

  
  let clickLikePost = async(postId) => {
    const {data} = await axios.put(`https://devroom-hfgx.onrender.com/api/posts/like/${postId}`,{},{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("devroom")}`,
      }
    });
   getPosts();
  };

  

  return (
    <React.Fragment>
      {/* { <pre>{JSON.stringify(posts)}</pre> } */}
      <section className="p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-teal">Posts of Devlopers You followed</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            {posts.length > 0 && (
              <div className="container">
                <div className="row">
                  <div className="col">
                    {posts
                      .slice(0)
                      .reverse()
                      .map((post) => {
                        return (
                           
                        

                          <div>
                            {profile.Following.includes(post.user._id)?
                                    
                                    


                          <div className="card my-2" key={post._id}>
                            <div className="card-body bg-light-grey">
                              <div className="row">
                                <div className="col-md-2">

                                   


                                  <img
                                    src={post.user.avatar}
                                    alt=""
                                    className="rounded-circle"
                                    width="50"
                                    height="50"
                                  />
                                  <br />
                                  <small>{post.name}</small>
                                  

                                </div>
                                <div className="col-md-8">
                                  <div className="row">
                                    <div className="col-md-6">
                                      <img
                                        src={post.image}
                                        alt=""
                                        className="img-fluid d-block m-auto"
                                      />
                                    </div>
                                  </div>
                                  <p style={{ fontWeight: "bold" }}>
                                    {post.text}
                                  </p>
                                  <small>
                                    {timeDifference(
                                      new Date(),
                                      new Date(post.createdAt)
                                    )}
                                  </small>
                                  <br />
                                  {post.likes.includes(user._id) ? (
                                    <button
                                      className="btn btn-like btn-sm me-2"
                                      onClick={clickLikePost.bind(
                                        this,
                                        post._id
                                      )}
                                      style={{ color: "white" }}
                                    >
                                      <i
                                        className="fa fa-thumbs-up me-2"
                                        style={{ color: "white" }}
                                      />{" "}
                                      {post.likes.length}
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-primary btn-sm me-2"
                                      onClick={clickLikePost.bind(
                                        this,
                                        post._id
                                      )}
                                    >
                                      <i className="fa fa-thumbs-up me-2" />{" "}
                                      {post.likes.length}
                                    </button>
                                  )}

                                  <Link
                                    to={`/posts/${post._id}`}
                                    className="btn btn-warning btn-sm me-2"
                                  >
                                    <i className="fab fa-facebook-messenger me-2" />{" "}
                                    Discussions {post.comments.length}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          :<div></div>}
                          </div>




                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        )}
      </section>
    </React.Fragment>
  );
};
export default PostList;