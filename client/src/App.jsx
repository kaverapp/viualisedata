import  { AuthButtons } from "./auth/Auth"

function App() {
 const api=async()=>{
     const response=await fetch("http://localhost:3000/")
     const data=await response.json()
     console.log(data)
 }
 api()
  return (
    <>
    <AuthButtons/>
    </>
  )
}

export default App
