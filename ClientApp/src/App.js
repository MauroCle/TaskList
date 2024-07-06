import 'bootstrap/dist/css/bootstrap.css';

import { useEffect, useState } from "react";


const App = () => {

    const [tasks, setTasks] = useState([])
    const [description, setDescription] = useState("")

    const ShowTasks = async () => {
        const response = await fetch("api/task/List");

        if (response.ok) {
            const data = await response.json();
            setTasks(data);
        } else {
            console.log("status code: " + response.status);
        }
    }

    //convert date
    const formatDate = (string) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let date = new Date(string).toLocaleDateString("es-PE", options);
        let hour = new Date(string).toLocaleTimeString();
        return date + " | " + hour;
    }

    useEffect(() => {
        ShowTasks();
    }, [])


    const saveTask = async (e) => {
        e.preventDefault() //cancels the form reload
        const response = await fetch("api/task/NewTask", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({TaskDescription: description }) //Model : useState
        })

        if (response.ok) {
            setDescription("");
            await ShowTasks();
        }
    }


    const endTask = async (id) => {

        const response = await fetch("api/task/EndTask/"+id, {
            method: "DELETE"
        })

        if (response.ok) {
            await ShowTasks();
        }
    }


    return (
        <div className="bg-success">
        <div className="container bg-dark p-4 vh-100">   
            
            <h2 className="text-white">To do list</h2>

            <div className="row">
                <div className="col-sm-12">
                    <form onSubmit={saveTask}>
                        <div className="input-group">
                            <input type="text"
                                className="form-control"
                                placeholder="Task description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}/> {/* e = event */}
                            <button className="btn btn-success" type="submit">Create new task</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-12">
                    <div className="list-group">
                        {
                            tasks.map(
                                (item) => (
                                    <div key={item.idTask} className="list-group-item list-group-item-action">
                                    <h5 className="text-primary">{item.taskDescription}</h5>

                                    <div className="d-flex justify-content-between">
                                        <small className="text-muted">{formatDate(item.creationDate)}</small>
                                        <button onClick={() => endTask(item.idTask)} className="btn btn-sm btn-outline-danger" >Task Ended</button>
                                    </div>
                                </div>
                            )
                        )
                        }
                    </div>
                </div>
            </div>
            </div>
        </div>
        )
}

export default App;