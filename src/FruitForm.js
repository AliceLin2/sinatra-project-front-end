import React, {useState} from "react";

function FruitForm({onAddFruit, ownerId}) {
  const [formData, setFormData]=useState({
    name:"",
    price:0,
    stock:0,
    health_benefit:""
  })

  function handleChange(e){
      const key = e.target.name
      const value = e.target.value
      setFormData({
        ...formData,
        [key]:value
      })
  }

  function handleSubmit(e){
      e.preventDefault()
      fetch('http://localhost:9292/fruits',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({...formData, owner_id:ownerId})
      })
      .then(r=>r.json())
      .then(data=>{
          onAddFruit(data)
          console.log(data)
      })
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <h3>Add New Fruit</h3>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange}/>
      </label>
      <label>
        Price:
        <input type="text" name="price" value={formData.price} onChange={handleChange}/>
      </label>
      <label>
        Stock:
        <input type="text" name="stock" value={formData.stock} onChange={handleChange}/>
      </label>
      <label>
        Health benefit:
        <textarea type="text" name="health_benefit" value={formData.health_benefit} onChange={handleChange}/>
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default FruitForm;