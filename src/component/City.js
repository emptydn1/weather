import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const axios = require('axios');

const getTemp = (woeid) =>
    axios.get(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
        .then(response => response.data);

class City extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: null
        }
    }

    componentDidMount() {
        if (this.state.temp === null) {
            getTemp(this.props.woeid).then((res) => {
                this.setState({
                    temp: res.consolidated_weather
                });
            })
        }
    }


    render() {
        return (
            <div className="col-2">
                <div className="card">
                    <div className="card-body">
                        <h4>{this.props.title}</h4>
                        <div className="state-icon-sml state-hr"></div>
                        <Link to={"/Weather/"+this.props.woeid} className="btn btn-primary">
                            Weather
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default City;