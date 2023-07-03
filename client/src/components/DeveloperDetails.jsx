import React, {useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import axios from "axios";
import { ExternalLink } from "react-external-link";
import { Link, useNavigate } from "react-router-dom";

let DeveloperDetails = () => {
  const [selectedProfile,setSelectedProfile] = useState({});
  let [loading,setLoading] = useState(true);
  let [user,setUser] = useState({});
  const [profile,setProfile] = useState({});
  const [create,setCreate] = useState();
  // let navigate= new Navigate;

  let developerId = useParams().developerId;

  const fetchDeveloper = async() =>{
    const {status ,data} = await axios.get(` https://devroom-hfgx.onrender.com/api/profiles/${developerId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setSelectedProfile(data.profile);
    setLoading(false);
    
  }

  useEffect(() => {
   fetchDeveloper(developerId);

   if(localStorage.getItem("devroom")){
   getUser();
   getProfile()}
  }, [developerId]);



  // aunthecitaion part
  const getUser = async () => {
    let { data } = await axios.get(" https://devroom-hfgx.onrender.com/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("devroom")}`,
      },
    });
    setUser(data.user);
    // console.log(user);
    // console.log(developerId);
    // console.log(data.user);
  };

  const getProfile = async() =>{
    let {status,data} = await axios.get(" https://devroom-hfgx.onrender.com/api/profiles/me",{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("devroom")}`,
      },
    })
    //  console.log(data)
    console.log(status)
    setCreate(status);
    console.log(create);

    if (status==200) setProfile(data.profile);
    // console.log(profile.Follower)

  }


   
  let isfollowingclicked = async() => {
    // console.log(developerId);
     let {data} =await axios.put(` https://devroom-hfgx.onrender.com/api/profiles/follower/${developerId}`,{},{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("devroom")}`,
      }
    });
    // console.log(developerId);
    // setFollower(!follow);

    // console.log(selectedProfile.Follower)
    // console.log(user);
   fetchDeveloper();
  };

  console.log(developerId);
  console.log(10);
  console.log(profile._id);


  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {Object.keys(selectedProfile).length > 0 && (
            <React.Fragment>
              <section className="p-3">
                <div className="container">
                  <div className="row animated zoomIn">
                    <div className="col">
                      <p className="h3 text-teal text-center">
                        <i className="fa fa-user-tie" />{" "}
                        {selectedProfile.user.name}'s Profile{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <div className="container bg-success text-white text-center p-3">
                  <div className="row">
                    <div className="col">
                      <img
                        src={selectedProfile.user.avatar}
                        alt=""
                        width="200"
                        height="200"
                        className="rounded-circle profile-img"
                      />
                      <p className="h2">{selectedProfile.user.name}</p>
                      <p className="h6">{selectedProfile.website}</p>
                      <p className="h6">{selectedProfile.designation}</p>
                      <p className="h6">{selectedProfile.company}</p>
                      <p>{selectedProfile.location}</p>
                      <div  className="d-flex justify-content-evenly">
                          

                          <div>
                            <p>{selectedProfile.Follower.length}</p>
                      

                          <p>Follower</p>
                          </div>
                          <div>
                            <p>{selectedProfile.Following.length}</p>
                      

                          <p>Following</p>
                          </div>
                      </div>


                      {localStorage.getItem("devroom") ?<div>
                          {create!=201?<div>
                            {developerId!==profile._id? 

<button onClick={isfollowingclicked} className=" badge bg-primary  btn  mb-3">
{!selectedProfile.Follower.includes(user._id)?<>Follow This developer</>:<>Unfollow</>}
 </button >

:""}

                          </div>:<Link to="/profiles/create-profile" className="btn mb-3 bg-primary  badge "
                           
                          >Create  Profile To Follow</Link>
                          
                          }
                           
                      </div>
                      
                      : " "

                        }
                      
                      
                    



                      <div className="d-flex flex-row justify-content-center">
                        <div className="p-2">
                          <ExternalLink
                            href={selectedProfile.social.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-facebook" />
                          </ExternalLink>
                        </div>

                        <div className="p-2">
                          <ExternalLink
                            href={selectedProfile.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-twitter" />
                          </ExternalLink>
                        </div>
                        <div className="p-2">
                          <ExternalLink
                            href={selectedProfile.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-linkedin" />
                          </ExternalLink>
                        </div>
                        <div className="p-2">
                          <ExternalLink
                            href={selectedProfile.githubUserName}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-github" />
                          </ExternalLink>
                        </div>
                        <div className="p-2">
                          <ExternalLink
                            href={selectedProfile.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-instagram" />
                          </ExternalLink>
                        </div>
                        <div className="p-2">
                          <ExternalLink
                            href={selectedProfile.social.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-youtube" />
                          </ExternalLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container ">
                  <div className="row">
                    <div className="col text-center">
                      <div className="card my-2">
                        <div className="card-body bg-comment text-black">
                        
                        <p className="h3">
                            {selectedProfile.user.name}'s Biography
                          </p>
                         {selectedProfile.bio.length>0?<div>

                          
                          <p>{selectedProfile.bio}</p>
                         </div>: <div >No Bio Added </div> 
                         

                         }
                         


                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col text-center">
                      <div className="card my-2">

                           {/* {selectedProfile.skills.length>1} */}
                        <div className="card-body bg-light-grey text-teal">
                          <p className="h3">
                            {selectedProfile.user.name}'s Skills
                          </p>
                          {selectedProfile.skills.map((skill) => {
                            return (
                              <span className="badge badge-dark p-2 m-2">
                                {skill}
                              </span>
                            );
                          })}
                        </div>



                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      {selectedProfile.experience.length > 0 ? (
                        <React.Fragment>
                          <div className="card">
                            <div className="card-body bg-primary text-white">
                              <p className="h3">Experience</p>
                              <ul className="list-group">
                                {selectedProfile.experience.map((exp) => {
                                  return (
                                    <li
                                      className="list-group-item my-2"
                                      key={exp._id}
                                    >
                                      <span style={{ fontWeight: "bold" }}>
                                        Title : {exp.title}
                                      </span>
                                      <br />
                                      <span style={{ fontWeight: "bold" }}>
                                        Company : {exp.company}
                                      </span>
                                      <br />
                                      <span style={{ fontWeight: "bold" }}>
                                        Location : {exp.location}
                                      </span>
                                      <br />
                                      <span style={{ fontWeight: "bold" }}>
                                        From : {exp.from}
                                      </span>
                                      <br />
                                      <span style={{ fontWeight: "bold" }}>
                                        To :{" "}
                                        {exp.to != " " ? exp.to : "Current"}
                                      </span>
                                      <br />
                                      <span style={{ fontWeight: "bold" }}>
                                        Description : {exp.description}
                                      </span>
                                      <br />
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </React.Fragment>
                      ) : null}
                    </div>
                    <div className="col-md-6">
                      {selectedProfile.experience.length > 0 ? (
                        <React.Fragment>
                          <div className="card">
                            <div className="card-body bg-warning text-white">
                              <p className="h3">Education</p>
                              <ul className="list-group">
                                {selectedProfile.education.map((edu) => {
                                  return (
                                    <li
                                      className="list-group-item my-2"
                                      key={edu._id}
                                    >
                                      <span style={{ fontWeight: "bold" }}>
                                        School : {edu.school}
                                      </span>
                                      <br />
                                      <span style={{ fontWeight: "bold" }}>
                                        Degree : {edu.degree}
                                      </span>
                                      <br />
                                      <span style={{ fontWeight: "bold" }}>
                                        Field of Study : {edu.fieldOfStudy}
                                      </span>
                                      <br />
                                      <span style={{ fontWeight: "bold" }}>
                                        From : {edu.from}
                                      </span>
                                      <br />
                                      <span style={{ fontWeight: "bold" }}>
                                        To :{" "}
                                        {edu.to != " " ? edu.to : "Current"}
                                      </span>
                                      <br />
                                      <span style={{ fontWeight: "bold" }}>
                                        Description : {edu.description}
                                      </span>
                                      <br />
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </React.Fragment>
                      ) : null}
                    </div>
                  </div>
                </div>
              </section>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      <div style={{ marginBottom: "150px" }} />
    </React.Fragment>
  );
};
export default DeveloperDetails;