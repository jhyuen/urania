import React, {Component} from "react";

class StarWarsPeople extends Component {

    constructor() {
        super();
        this.state = {
            people: null
        };
    }

    fetchStarWarsPeople() {
        fetch('https://swapi.co/api/people/?format=json')
            .then(results => {
                if (!results.ok) {
                    throw Error(results.statusText);
                }
                return results.json();
            }).then(data => {
                this.setState({ people: data.results });
            }).catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.fetchStarWarsPeople();
    }

    render() {
        if (this.state.people) {
            const peopleArray = this.state.people.map(person => {
                return <tr key={person.name}><td>{person.name}</td><td>{person.birth_year}</td></tr>;
            });
            return (
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Birth Year</th>
                            </tr>
                            {peopleArray}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }

}

export default StarWarsPeople;