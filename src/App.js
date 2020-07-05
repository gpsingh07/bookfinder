import React, { useState } from 'react';
import Form from './components/Form';
import List from './components/List';
import {getBook, getTitles} from './utils/util';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [count, setCount] = useState(3);
  
  function findBook(query){
    if(query === "")
      setSuggestions([]);
    else
      setSuggestions(getTitles({ query, count }));
  }

  function submit(index){
    setBooks([ ...books, getBook(index)])
    setSuggestions([]);
  }

  function onclick(){
    setSuggestions([]);
  }

  return (
    <div className="App">    
      <header className="app-header">
        Book Finder
      </header>
      <Form 
        suggestions={suggestions} 
        findBook={findBook} 
        handleSubmit={submit}
        handleClick={onclick}
      />
      <List items={books} />
    </div>
  );
}

export default App;
