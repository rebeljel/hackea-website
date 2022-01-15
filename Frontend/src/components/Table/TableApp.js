import React, { Component } from "react";
import Table from "./Table"


class TableApp extends Component{

    state = {
        characters: [],
    }

    removeCharacter = index => {
        const {characters} = this.state;

        this.setState({
            characters: characters.filter((character, i) => {
                return i !== index
            }),
        })
    }

    render(){
        const characters = [
            {name: 'Charlie', job: 'Janitor'},
            {name: 'Mac', job: 'Bouncer'}
        ]

        return (
            <div>
                <Table characterData={characters} removeCharacter={this.removeCharacter} />
            </div>
        )
    }
}


export default TableApp