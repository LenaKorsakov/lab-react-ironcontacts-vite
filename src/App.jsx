import './App.css';

import { useState } from 'react';
import JSONData from './contacts.json';

const sortByName = (nameA, nameB) =>
  nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });

let arrOfUniqueInt = [];

const getRandomInt = (min, max) => {
  const generateNumber = () => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  let randNum = generateNumber();

  while (arrOfUniqueInt.includes(randNum)) {
    randNum = generateNumber();
  }
  arrOfUniqueInt.push(randNum);

  return randNum;
};

function App() {
  const trophyOscar = '🏆';
  const trophyEmmy = '🌟';
  const [contacts, setContacts] = useState(JSONData.slice(0, 5));

  const randomIndex = getRandomInt(5, JSONData.length - 1);

  const handleButtonClick = () => {
    const randomContact = JSONData[randomIndex];

    setContacts([...contacts, randomContact]);
  };

  const handleButtonSortByName = () => {
    const sortedContacts = [...contacts].sort((persA, persB) =>
      sortByName(persA.name, persB.name)
    );

    setContacts(sortedContacts);
  };

  const handleButtonSortByPopularity = () => {
    const copy = [...contacts];
    const sortedContacts = copy.sort((persA, persB) => {
      if (persA.popularity === persB.popularity) {
        return sortByName(persA.name, persB.name);
      }

      return persB.popularity - persA.popularity;
    });
    setContacts(sortedContacts);
  };

  const handleDeleteButton = (id) => {
    const contactsToKeep = contacts.filter((contact) => contact.id !== id);

    setContacts(contactsToKeep);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <div className="buttons-wrapper">
        <button className="btn" onClick={handleButtonClick}>
          Add Random Contact
        </button>
        <button className="btn" onClick={handleButtonSortByPopularity}>
          Sort By Popularity
        </button>
        <button className="btn" onClick={handleButtonSortByName}>
          Sort By Name
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((pers) => {
            return (
              <tr key={pers.id}>
                <td>
                  <img src={pers.pictureUrl} alt={pers.name} width="50px" />
                </td>
                <td>{pers.name}</td>
                <td>{pers.popularity.toFixed(2)}</td>
                <td>{pers.wonOscar && <span>{trophyOscar}</span>}</td>
                <td>{pers.wonEmmy && <span>{trophyEmmy}</span>}</td>
                <td>
                  <button
                    className="delete"
                    onClick={() => handleDeleteButton(pers.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
