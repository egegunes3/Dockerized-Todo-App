import { FaTimes } from "react-icons/fa";

const Todo = ({ todo, deleteTodo }) => {
  return (
    <div className="to-do">
      <h3>
        {todo.text}
        <FaTimes
          style={{ color: "red" }}
          onClick={() => deleteTodo(todo._id)}
        />
      </h3>
    </div>
  );
};

export default Todo;
