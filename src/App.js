import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'aaa', name: 'Max', age: 28 },
      { id: 'bbb', name: 'Manu', age: 29 },
      { id: 'ccc', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ 
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 30 },
        { name: 'Stephanie', age: 26 }
      ]
    } )
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  toggledPersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }

  render() {
    const style = {
      font: 'inherit',
      backgroundColor: 'green',
      border: '2px solid blue',
      padding: '8px',
      cursor: 'pointer',
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return  <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age} 
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}
            />
          })}
        </div>    
      );
      style.backgroundColor = 'red';
    }

    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1> Hi, I'm React App</h1>
        <p className={classes.join(' ')}>This is realyy working!</p>
        <button
          style={style}
          onClick={this.toggledPersonsHandler}> Switch Name 
        </button>
        {persons}
      </div>
    
    )
  }
}

export default App;
