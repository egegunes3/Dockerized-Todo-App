import Todo from "./Todo"

const Todos = ({todos, deleteTodo}) => {
  return (
    <>
        {todos.map((todo, index) => (
            <Todo key={index} todo={todo} deleteTodo={deleteTodo}/>
        ))}
    </>
  )
}

export default Todos