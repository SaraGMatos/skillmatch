import "../styles/showcase.css"
import { useState, useContext } from "react";
import supabase from "../../config/config_file";
import { UserContext } from "../contexts/UserContext";

function UserShowcase() {
  const { user } = useContext(UserContext)
  const [inputField, setInputField] = useState('')
  
  
  const handleOnSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase
        .from("Users")
        .update({ showcase: inputField })
        .eq('user_id', user.user_id)
        
    } catch (error) {
      console.log(error)
    }

    alert('Showcase updated')
  }

  const handleChange = (e) => {
    setInputField(e.target.value)
    
  }
  
  return ( 
    <div className="showcase-container">
     
      <form onSubmit={handleOnSubmit}>
        <textarea
          className="textarea"
          name="showcaseContent"
          placeholder="Write your showcase here...."
          type="text"
          onChange={handleChange}
          defaultValue={user.showcase}
        />
        <button className="showcaseSubmit" type="submit">✅</button>
        </form>
       
      
    </div>
  )
}

export default UserShowcase;
