import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import numberService from "./services/number";
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState({text:null,type:''});
  const [filterPersons, setFilterPersons] = useState(persons);

  useEffect(() => {
    numberService.getAllNumbers().then((res) => {
      setPersons(persons.concat(res.data));
      setFilterPersons(persons.concat(res.data));
    });
  }, []);

  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);

  const handleNewPerson = (event) => {
    event.preventDefault();

    if (persons.find((p) => p.name === newName && p.number === newNumber)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else if (persons.find((p) => p.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, do you want to change the number?`)) {
        const person = persons.find( p => p.name === newName);
        numberService
          .updateNumber(person.id, { ...person, number: newNumber })
          .then((res) => {
            setPersons(persons.map((p) => (p.id !== person.id ? p : res.data)));
            setFilterPersons(
              persons.map((p) => (p.id !== person.id ? p : res.data))
            );
            setMessage({ text: `${res.data.name} number Changed`, type: 'success' })
            setTimeout(() => {
            setMessage({ text: null, type: '' });
            }, 3000);
            setNewName("");
            setNewNumber("");
          }).catch(err =>{
            console.log(err)
            setMessage({ text: `Error, number was already removed from server`, type: 'error' });
            setTimeout(()=>{
              setMessage({ text: null, type: '' });
            },3000)
            setPersons(persons.filter(p => p.id !== person.id))
            setFilterPersons(persons.filter(p => p.id !== person.id))
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: `${persons.length+1}`
      }
      numberService.setNumber(newPerson).then((res) => {
        setPersons(persons.concat(res.data));
        setFilterPersons(persons.concat(res.data));
        setNewName("");
        setNewNumber("");
        setMessage({ text: `Added ${res.data.name}`, type: 'success' });
        setTimeout(() => {
          setMessage({ text: null, type: '' });
        }, 3000);
      });
    }
  };

  const filterByName = (event) => {
    const target = event.target.value.toLowerCase();
    const filterPersonsArr = persons.filter((p) =>
      p.name.toLowerCase().includes(target)
    );
    setFilterPersons(filterPersonsArr);
  };

  const handleDeleteButton = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`delete ${person.name}?`)) {
      numberService.deleteNumber(id).then((res) => {
        setPersons(persons.filter((p) => p.id !== id));
        setFilterPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const formData = {
    newName,
    newNumber,
    handleNewName,
    handleNewNumber,
    handleNewPerson,
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.text} type={message.type}/>
      <Filter filterByName={filterByName} />
      <PersonForm props={formData} />
      <h2>Numbers</h2>
      <Persons
        filterPersons={filterPersons}
        handleDeleteBtn={handleDeleteButton}
      />
    </div>
  );
};

export default App;