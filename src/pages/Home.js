import React, {useState, useEffect, useContext} from 'react'
import GoalWrapper from '../componets/GoalWrapper';
import {globalContext} from "../context/GlobalState";
import { Link } from "react-router-dom";



function Home() {
    const {logout, loading, authData, goals} = useContext(globalContext);

   
  

    return (
      <div>
          <div className="row">
            <h4>Good Morning, {authData.username}</h4>
            <div className="col-md-4">
              <div>
                <button onClick={logout} className="btn btn-danger">Logout</button>
                <br /><br />
                <div className="goalWrapper">
                <GoalWrapper />
                {goals.length > 0 && goals.map((goal, index) => {
                  return <div className="card p-3 mt-4 d-flex" key={goal._id}>
                   <h5>{goal.title}</h5>
                    <div>
                      <Link to={`/goal/${goal._id}`}><button className="btn btn-sm btn-secondary">View</button></Link>
                    </div>
                  </div>
                })}
                </div>
              </div>
            </div>
            <div className='col-md-8'>
              
            </div>
          </div>
      </div>
  )
}

export default Home