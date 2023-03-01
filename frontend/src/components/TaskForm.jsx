import { useState } from "react"
import Popup from "./Popup"

const TaskForm = ({ addToDo }) => {
    const [toDo, setToDo] = useState("")
    const [showPopUp, setPopUp] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!toDo) {
            setPopUp(!showPopUp)
            return;
        }

        addToDo({ text: toDo })
        setToDo("")
    }

    const handleClose = () => {
        setPopUp(!showPopUp)
    }

    return (
        <>
            {showPopUp && (<div><Popup handleClose={handleClose} content="Please enter a Todo Task"></Popup></div>)}
            <form onSubmit={onSubmit}>
                <div>
                    <input className="to-do-input" type="text" placeholder="Add a Task" value={toDo} onChange={(e) => setToDo(e.target.value)} />
                </div>
                <button className="save-btn">Save the Task</button>
            </form>

        </>
    )
}

export default TaskForm