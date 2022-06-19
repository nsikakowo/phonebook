import {useState} from 'react'
import './App.css';

function FormEntry ({addToPhoneEntry}){
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phonenumber, setphonenumber] = useState("");

  const handleSubmit=(e)=>{
    e.preventDefault();

    if(!firstname || !lastname || !phonenumber){
      alert("Please fill the form corretly");
      return;
    }


    addToPhoneEntry({firstname, lastname, phonenumber, id:Math.floor(Math.random() * 1000) });
    setfirstname("");
    setlastname("")
    setphonenumber("");
  }

  return(
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="firstname" 
        id="firstname" 
        value={firstname}
        placeholder="FirstName"
        onChange={(e) => setfirstname(e.target.value)}
      />
      <input 
        type="text" 
        name="lastname" 
        id="lastname" 
        value={lastname}
        placeholder="LastName"
        onChange={(e) => setlastname(e.target.value)}
      />
      <input 
        type="number" 
        name="phonenumber" 
        id="phonenumber" 
        value={phonenumber}
        placeholder="Phone Number"
        onChange={(e) => setphonenumber(e.target.value)}
        onInput={(e) => e.target.value = e.target.value.slice(0, 11)}
      />
      <input type="submit" value="Submit"  className='btn'/>
    </form>
  )
}

function DisplayPhonebook({entries}){
  return(
    <>
      {
        entries.length > 0 && 
        <table>
      <thead>
        <tr>
          <th></th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {
          entries.map(entry => (
            <tr key={entry.id}>
                <td><span className='dp'>{entry.firstname[0]}{entry.lastname[0]}</span> </td>
                <td>{entry.firstname}</td>
                <td>{entry.lastname}</td>
                <td>{entry.phonenumber}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
      }
    </>
    
  )
}

function App() {
  const [entries, setentries] = useState([]);

  const addToPhoneEntry =(entry)=>{
    setentries([...entries, entry].sort((a,b) => a.firstname.toLowerCase() > b.firstname.toLowerCase() ? 1 : -1))
  }

  return (
    <main className="App">
      <section>
        <header>
          <h1>My Phonebook</h1>
        </header>
        <FormEntry addToPhoneEntry={addToPhoneEntry}/>
        <DisplayPhonebook entries={entries}/>
      </section>
    </main>
  );
}



export default App;
