import React, { Component } from 'react';
import axios from 'axios';
// import PersonalList from './playground/PersonalList'


class App extends Component {
    constructor() {
        super();
        this.state = {
            people: "",
            title: '',
            body: 'insert your description'
        };
    }
    // res stand for response

    setTitle = (event) => {
        this.setState({
            title: event.target.value,
        })
    };
    setBody = (e) => {
        this.setState({
            body: e.target.value,
        })
    };
    componentWillMount() {
        this.loadData();
    }
    loadData = () => {
        axios.get("http://localhost:3001/api/notes/list").then(res =>
            // console.log(res.data);
            this.setState(
                {
                    people: res.data
                },
                console.log("hi", res.data)
            )
        )
    }
    addNote = () => {
        axios.get("http://localhost:3001/api/notes/add?title=" +
            this.state.title +
            "&body=" +
            this.state.body).then(res =>
                // console.log(res.data);
                this.setState(
                    {
                        people: res.data
                    },
                    console.log("addNOte", res.data)
                )
            )
        console.log("button")

    }
    RemoveNote = () => {
        axios.get("http://localhost:3001/api/notes/list").then(res =>
            // console.log(res.data);
            this.setState(
                {
                    people: res.data
                },
                // console.log("remove", res.data)
            )
        )
    }
    render() {
        const result = () => {
            const arrayOfPosts = [];

            for (let note in this.state.people.data) {
                arrayOfPosts.push(
                    <ul>
                        <li>{this.state.people.data[note].title}</li>
                        <li>{this.state.people.data[note].body}</li>
                    </ul>
                );
            }
            return arrayOfPosts;

        }

        return (
            <React.Fragment>
                {this.state.people.description}
                {result()}
                {/* <PersonalList /> */}
                {/* INPUT */}
                <input type="text"
                    value={this.state.title}
                    onChange={this.setTitle}
                />
                <hr />
                <textarea
                    cols="33"
                    rows="5"
                    name="text"
                    value={this.state.body}
                    onChange={this.setBody}
                ></textarea>
                <hr />
                {/* BUTTON */}
                <button onClick={this.addNote}>Send your description</button>
                <button onClick={this.RemoveNote}>Remove</button>

            </React.Fragment>
        );
    }
}

export default App;
