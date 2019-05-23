import React from 'react';
import axios from 'axios';

export default class PersonalList extends React {
    state = {
        persons: []
    }

    componentDidMount() {

        //it's performing an http get request on a specific url
        axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
            this.setState({ persons: res.data });
        })
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.persons.map(person => <li key={person.id}>{person.name}</li>)}
                </ul>
            </div>
        )
    }
}