import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  populatePets = (res) => {
    this.setState({
      pets: res
    }, () => console.log(this.state.pets))
  }

  handleChange = (event) => {
    this.setState({
      filters: {type: event.target.value}
    }, () => console.log(this.state.filters))
  }

  onFindPetsClick = () => {
    let apiVar = (this.state.filters.type === 'all') ? `/api/pets` : `/api/pets?type=${this.state.filters.type}`
    fetch(apiVar).then(res => res.json()).then(res => this.populatePets(res))
  }

  handleAdopt = (id) => {
    this.setState({pets: this.state.pets.map(pet => (pet.id === id) ? pet.isAdopted: true)})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters handleChange={this.handleChange} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.handleAdopt} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
