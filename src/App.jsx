import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
 
  const [length, setLength] = useState(8)
  const [numberAllow, setNumberAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)

  const[password,setPassword] = useState("")
  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
      let pass = ""
      let str  = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numberAllow) str += "0123456789"
      if(charAllow) str += "!@#$%^&*(){}~`"



      for(let i=1; i<= length; i++){
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
      }

      setPassword(pass)

  },[length,numberAllow,charAllow,setPassword])

  const copyPasswordToClipboard =  useCallback(() => {
    passwordRef.current?.select();
    var btn = document.querySelector(".copy-btn");
    btn.textContent = "Copied"
    
  
    window.navigator.clipboard.writeText(password);
  },[password]) 


  useEffect ( () => {
    passwordGenerator()
    var btn = document.querySelector(".copy-btn");
    btn.textContent = "Copy"

  } , [length,numberAllow,charAllow,passwordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
         <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
     
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref= {passwordRef}/>
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 copy-btn'>copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={15} value={length} className='cursor-pointer' 
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label htmlFor="">Lenght: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={numberAllow}
            id='numberInput'
            onChange={() => {
              setNumberAllow((prev) => !prev);
            }} 
            />
            <label htmlFor="numberInput">Numbers</label>

            <input type="checkbox"
            defaultChecked={charAllow}
            id='charInput'
            onChange={() => {
              setCharAllow((prev) => !prev);
            }} 
            />
            <label htmlFor="numberInput">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
