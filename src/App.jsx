import { useState,useRef,useEffect } from "react";
import "./App.css";


function App() {
  const [todo, setTodo] = useState([
    { id: Number(new Date()),
      content: '안녕하세요',
    }
  ]);
   return (
   <>
   <Advice />
   <StopWatch />
   <TodoInput setTodo={ setTodo } />
   <TodoList todo={todo} setTodo={setTodo}/>
   
   </>
   )
   }
  
const useFetch = (url) =>{
  const [isLoading, setIsloading] = useState(true)
  const [data,setData] = useState(null)

  useEffect(() => {
    fetch (url)
    .then((res) => res.json())
    .then((res) => {
      setData(res)
    setIsloading(false)
    })
  }, [url])
  return [isLoading,data]
}



const Advice = () =>{
 const [isLoading,data]= useFetch ("https://korean-advice-open-api.vercel.app/api/advice")
  
  return (
   <>
   {!isLoading && (
   <>
   <div>{data.message}</div>
   <div>-{data.author}-</div>
   </>


   )}
   </>

  )
}







  const Clock = () =>{
    
    const [time,setTime] = useState(new Date())
    useEffect(() =>{
      setInterval(() =>{
        setTime(new Date())
    }, 1000)
    }, [])
    return <div>{time.toLocaleTimeString()}</div>

  } 

const formatTime = (seconds) =>{
  const timeString = `${String(Math.floor(seconds /3600)).padStart
  (2,"0" )}:${String (seconds % 60).padStart(2,"0")}`
 
  return timeString
}

const StopWatch =() => {

  const [time,setTime] = useState(3600)
  const [isOn,setIsOn] = useState(false)
  return <>{formatTime(time)}</>

}



const TodoInput = ({setTodo}) => {
  const inputRef = useRef(null)
  const addTodo =() => {
   const newTodo ={
     id: Number(new Date()),
     content: inputRef.current.value,
   }
   setTodo((prev) => [...prev, newTodo])

  }


  return(
    <>
    <input ref={inputRef} />
    <button onClick={addTodo}>추가</button>
    
    </>


  )
}

const TodoList = ({todo, setTodo}) => {
  return (
     <ul>
      {todo.map((el) => (
       <Todo key={todo.id} todo={el} setTodo={setTodo} />
      ))}
     </ul>

   
 
 );
}

const Todo = ({todo,setTodo}) =>{
 return(
   <li>
        {todo.content}
        <button 
        onClick={() => {
        setTodo((prev) => prev.filter
        ((el) =>el.id !== todo.id))
        }}
         >
         삭제 
         </button>
  </li>
 )
 }


 

export default App;
