import React from "react";
import { render } from "react-dom";

const Todo = props => (
  <li>
  <input type="checkbox" checked={props.todo.completed} onChange={props.completed}/>
  <button onClick={props.delete}>Delete</button>
  <span Style={props.todo.style}>{props.todo.text}</span>
  </li>
)

let id = 0

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
    }
  }
  
  add_todo() {
    const text = prompt("Enter todo text")
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: id++, 
          text: text, 
          completed: false,
          style: ""
        }
      ]
    })
  }

  remove_todo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }

  is_completed(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        return {
          id: todo.id,
          text: todo.text,
          completed: !todo.completed,
          style: todo.completed ? "" : "text-decoration: line-through"
        }
      })
    })
  }

  render() {
    return (
      <div>
        <div>Todos count: {this.state.todos.length} </div>
        <div>Unchecked Todos count: {this.state.todos.filter(todo => !todo.completed).length} </div>
        <button onClick={() => this.add_todo()}>Add Todo</button> 
        <ol>
          {this.state.todos.map(todo => 
            <Todo 
              delete={() => this.remove_todo(todo.id)}
              completed={() => this.is_completed(todo.id)}
              todo={todo} 
            />
          )}
        </ol>
      </div>
    )
  }
}

render(<App />, document.getElementById("root"));
