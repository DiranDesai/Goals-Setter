import React, { useState, useEffect, useContext } from 'react'
import { Navigate, useParams } from "react-router-dom"
import { globalContext } from "../context/GlobalState";

function Goal() {
    const [singleGoal, setSingleGoal] = useState(null);

    const {id} = useParams();
    const { getSingleGoal, deleteGoal } = useContext(globalContext);

    useEffect(() => {
        const loadGoal = async () => {
            const goal = await getSingleGoal(id);
            setSingleGoal(goal);
        }

        loadGoal();
    }, []);

    function handleDelete() {
        deleteGoal(id);
        window.location = "/";
    }
    
    return (
        <div>
            {singleGoal && <div className="card p-3">
                    <h5>{singleGoal.title}</h5>
                    <br /><br />
                    <div>
                        <button className='btn btn-sm btn-danger' onClick={handleDelete}>Delete</button>
                        <button className='btn btn-sm btn-success ml-4'>Share Now</button>
                    </div>
                </div>}
        </div>
    )
}

export default Goal