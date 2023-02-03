import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const fetchJob = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs);
    setLoading(false);
    console.log(jobs);
  };

  useEffect(() => {
    fetchJob();
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    );
  }

  // Très important de faire ca après le loading, il va empecher une erreur du fait que le state est un tableau vide et qu'il n'y a rien a destructurer. il va seulement le faire une fois que le fetch est fini
  const { company, dates, duties, title } = jobs[value];

  return (
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {jobs.map((job,idx) =>{
            console.log(job)
            return <button key={job.id} onClick={()=>setValue(idx)} className={`job-btn ${idx === value && 'active-btn'}`}>{job.company}</button>
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, idx)=>{
            return <div key={idx} className="job-desc"><FaAngleDoubleRight className="job-icon"/><p>{duty}</p></div>
          })}
        </article>
      </div>
    </section>
  );
}

export default App;
