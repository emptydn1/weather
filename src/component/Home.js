import React, { Component } from 'react';
import City from './City';
import { Link } from 'react-router-dom';
const axios = require('axios');


const getProductData = (a) =>
    axios.get(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${a}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
        .then(response => response.data);


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            so: 6,
            search: null
        }
    }

    componentDidMount() {
        if (this.state.data === null) {
            getProductData("n").then((res) => {
                this.setState({
                    data: res
                });
            })
        }
    }

    

    isChange = (event) => {
        this.setState({
            so: event.target.value
        });
    }

    prinData = () => {
        var a = ["Istanbul", "Berlin", "London", "Helsinki", "Dublin", "Vancouver"];
        var b = [];
        if (this.state.data !== null) {
            this.state.data.forEach(element => {
                for(let i=0; i<a.length; i++){
                    if(a[i].indexOf(element.title) !== -1){
                        b.push(element);
                    } 
                }
            });
            return(
                b.map((value, index) => {
                    if(index < this.state.so){
                        return(    
                            <City
                                key={index}
                                so={this.state.so}
                                woeid={value.woeid}
                                title={value.title}
                            />
                        )
                    }
                    else{
                        return null;
                    }
                })
            )
        }
    }

    search = (event) => {
        this.setState({
            search: event.target.value
        });
    }


    render() {
        return (
            <div className="container">
                <div className="row justify-content-center mt-4 mb-4">
                    <div className="col-4">
                        <form>
                            <input type="text"  onChange={(event) => this.search(event)} name="search" className="form-control" id="search-input" placeholder="Search..." />
                            <Link to={"/Weather/search/"+this.state.search}>
                                <input type="submit" className="form-control" id="search-input" placeholder="Search..." />
                            </Link>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <form>
                        <div className="form-group">
                            <select className="custom-select" onChange={(event) => this.isChange(event)} name="so">
                                <option defaultValue={this.state.so}>6</option>
                                <option value="4">4</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div className="row">
                    {this.prinData()}
                </div>
            </div>
        );
    }
}

export default Home;