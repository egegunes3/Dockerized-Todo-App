import Button from "./Button"

const ToDoHeader = ({formToggle, currentState}) => {
  return (
    <header className="header">
        <h1>To Do List</h1>
        <Button formToggle={formToggle} currentState={currentState}/>
    </header>
  )
}

export default ToDoHeader