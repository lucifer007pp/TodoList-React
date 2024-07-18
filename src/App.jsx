import { useState, useEffect } from 'react'
import Navbar from './componentes/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [finished, setfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleedit = (e, id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newtodos = todos.filter(item=>{
      return item.id !== id
    })
    setTodos(newtodos)
    saveToLS()
  }

  const handledelete = (e, id)=>{
    let newtodos = todos.filter(item=>{
      return item.id !== id
    })
    setTodos(newtodos)
    saveToLS()
  }

  const handleadd = ()=>{
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }

  const handlechange =(e)=>{
    setTodo(e.target.value)
  }

  const togglefinished =(e)=>{
    setfinished(!finished)
  }

  const handlecheckbox =(f)=>{
    let id = f.target.name
    let index = todos.findIndex(item=>{
      return item.id === id
    })
    let newtodos = [...todos] // for new array
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    setTodos(newtodos)
    saveToLS()
  }

  return (
    <>
    <Navbar/>
      <div className="mx-3 md:container min-h-[80vh] md:w-1/2 md:mx-auto bg-violet-400 my-5 rounded-xl p-5">
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Task</h2>
          <input onChange={handlechange} value={todo} type="text" className='w-full rounded-lg px-5 py-1'/>
          <button onClick={handleadd} disabled={todo.length <= 3} className='bg-violet-700 hover:bg-violet-800 disabled:bg-violet-500 p-3 py-1 text-white rounded-lg'>Save</button>
        </div>
        <input className='my-4' type="checkbox" onChange={togglefinished} checked={finished} name="" id="" /> Show Finished Tasks
        <div className="">
          <h2 className='text-lg font-bold'>Your Tasks</h2>
          <div className="todos">
            {todos.length === 0 && <div className='m-5'>No Tasks</div>}
            {todos.map(item=>{
                   // to show thw finished task
            return (finished || !item.isCompleted) && <div key={item.id} className="todo my-3 flex md:w-1/2 justify-between">
                <div className='flex gap-5'>
                <input onChange={handlecheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
                </div>
                  <div className="buttons flex h-full">
                    <button onClick={(e)=>{handleedit(e, item.id)}} className='bg-violet-700 hover:bg-violet-800 p-2 py-1 text-white text-sm rounded-md mx-1'><FaEdit /></button>
                    <button key={item.id} onClick={(e)=>{handledelete(e, item.id)}} className='bg-violet-700 hover:bg-violet-800 p-2 py-1 text-white text-sm rounded-md mx-1'><MdDelete /></button>
                  </div>
            </div>

            })}

          </div>
        </div>
      </div>
    </>
  )
}

export default App
