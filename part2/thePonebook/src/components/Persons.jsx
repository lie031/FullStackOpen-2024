const Persons = ({filterPersons,handleDeleteBtn}) =>{
    return(
      
      <div>
      {filterPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={()=> handleDeleteBtn(person.id)}>delete</button>
        </p>
      ))}
    </div>
    )
}

export default Persons
