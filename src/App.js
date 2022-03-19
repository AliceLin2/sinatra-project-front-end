import React, { useEffect, useState } from "react";
import Search from "./Search";
import FruitList from "./FruitList";
import Header from "./Header";
import NewFruitForm from "./NewFruitForm";

function App() {
  const [fruits, setFruits] = useState([]);
  const [owners, setOwners] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:9292/owners")
      .then((r) => r.json())
      .then((owners) => setOwners(owners));
  }, []);

  useEffect(() => {
    if(selectedOwner == "All"){
      fetch("http://localhost:9292/fruits")
      .then((r) => r.json())
      .then((fruits) => setFruits(fruits))
    }else{
      fetch(`http://localhost:9292/${selectedOwner}/fruits`)
      .then((r) => r.json())
      .then((fruits) => setFruits(fruits))
    }
  }, [selectedOwner]);

  function handleAddFruit(newFruit) {
    setFruits([...fruits, newFruit]);
  }

  function handleDeleteFruit(id) {
    const updatedFruits = fruits.filter((fruit) => fruit.id !== id);
    setFruits(updatedFruits);
  }

  function handleUpdateFruit(updatedFruit) {
    const updatedFruits = fruits.map((fruit) => {
      if (fruit.id === updatedFruit.id) {
        return updatedFruit;
      } else {
        return fruit;
      }
    });
    setFruits(updatedFruits);
  }

  const showFruits = fruits.filter((fruit) =>
    fruit.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <Header owners={owners} onChangeSelect={setSelectedOwner} selectedOwner={selectedOwner}/>
      <Search search={search} onSearch={setSearch}/>
      <NewFruitForm onAddFruit={handleAddFruit}/>
      <FruitList
        fruits={showFruits}
        onDeleteFruit={handleDeleteFruit}
        onUpdateFruit={handleUpdateFruit}
      />
    </main>
  );
}

export default App;
