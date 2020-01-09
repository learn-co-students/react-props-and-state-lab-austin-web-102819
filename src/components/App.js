import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  handleChange = event => {
    this.setState({
      filters: { type: event.target.value }
    });
  };

  handleAdopt = id => {
    console.log(id);
    const pets = this.state.pets.map(pet => {
      return pet.id === id ? { ...pet, isAdopted: true } : pet;
    });
    this.setState({ pets: pets });
  };

  handleFetchPet = () => {
    const apiUrl =
      this.state.filters.type === "all"
        ? "/api/pets"
        : `/api/pets?type=${this.state.filters.type}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        this.populatePets(data);
      });
  };

  populatePets = data => {
    this.setState({ pets: data });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.handleChange}
                onFindPetsClick={this.handleFetchPet}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.handleAdopt}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
