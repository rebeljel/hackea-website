import React, { Component } from "react";

class Liste extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('https://ghibliapi.herokuapp.com/films')
        .then(result => result.json())
        .then(result => {
            this.setState({
                data: result,
                isLoading: true
            })
        })
    }

    render(){
        const {data} = this.state

        const result = data.map((entry, index) => {
            return <li key={entry.id}>{entry.title}</li>
        })

        return <ul>{result}</ul>
    }
}

export default Liste