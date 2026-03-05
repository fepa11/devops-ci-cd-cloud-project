import { useEffect, useState } from "react"
import "./App.css"

function App() {

  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks")
    const data = await res.json()
    setTasks(data)
  }

  const addTask = async () => {
    if (!title) return

    await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    })

    setTitle("")
    fetchTasks()
  }

  return (
    <div className="container">

      <header>
        <h1>Felipe Alves Muniz</h1>
        <p>DevOps Engineer | Cloud | CI/CD | Containers</p>
      </header>

      <section className="stats">

        <div className="card">
          <h3>Deployments</h3>
          <p>12</p>
        </div>

        <div className="card">
          <h3>Pipelines</h3>
          <p>5</p>
        </div>

        <div className="card">
          <h3>Containers</h3>
          <p>8</p>
        </div>

        <div className="card">
          <h3>Builds</h3>
          <p>23</p>
        </div>

      </section>

      <section className="task-box">

        <h2>DevOps Task Manager</h2>

        <div className="task-input">
          <input
            placeholder="Nova tarefa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button onClick={addTask}>Adicionar</button>
        </div>

        <p>Total de tarefas: {tasks.length}</p>

        <ul>
          {tasks.map(task => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>

      </section>

      <footer>

        <a href="https://github.com/fepa11" target="_blank">
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/felipe-alves-muniz"
          target="_blank"
        >
          LinkedIn
        </a>

      </footer>

    </div>
  )
}

export default App