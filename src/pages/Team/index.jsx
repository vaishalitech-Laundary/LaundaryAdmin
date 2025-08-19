import React, { useState } from 'react'

const Index = () => {
    
    const [formData,setFormData]=useState({
        name:"",
        email:""
    })

    const handle=(e)=>{
        const{name,value}=e.target
        setFormData({...formData,[name]:value

        })
    }

    const submi=(e)=>{
        e.preventDefault();
        console.log(formData)
    }
  return (
    <div>
        <form onSubmit={submi}>
            <input type="text" name="name" value={formData.name} onChange={handle} placeholder='name'>

            </input>
            <input 
            
            type="email"
            name="email"
            value={formData.email}
            onChange={handle}
            placeholder='email'
            
            
            >


            </input>
            <button type="submit">Submit</button>


        </form>
      
    </div>
  )
}

export default Index
