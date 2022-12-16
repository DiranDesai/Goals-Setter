import React, {useState, useEffect, useContext} from 'react'
import { globalContext } from "../context/GlobalState";

function GoalWrapper() {
    const [title, setTitle] = useState("");

    const { submitGoal, fetchGoals, authData } = useContext(globalContext);

    useEffect(() => {
        fetchGoals();
        console.log(authData);
    }, [authData.token])


    function handleSubmit(e) {
        e.preventDefault();

        submitGoal({title});
        setTitle("");
    }

    return (
        <div>
            <h4>Create Goals</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="">Title</label>
                    <input type="text" className="form-control" placeholder="Whats on your mind?" onChange={e => setTitle(e.target.value)} value={title} />
                </div>
                <br />
                <input type="submit" value="Share Goal" className="btn btn-primary" />
            </form>
        </div>
    )
}

export default GoalWrapper