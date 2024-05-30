const Filter = ({ filterByName }) => {
    return (
      <div>
        filter shown with <input type="text" onChange={filterByName} />
      </div>
    );  
  };
  
export default Filter