import React, { Component } from 'react';
import Weathers from './Weathers';
import { Redirect, Link } from "react-router-dom";

const axios = require('axios');

const getTemp = (woeid) =>
    axios.get(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
        .then(response => response.data);

const getProductData = (a) =>
    axios.get(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${a}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
        .then(response => response.data);
    

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: null,
            name: null,
            dt: null,
            dt2: null,
            value1: null,
            value2: null
        }
    }

    componentDidMount() {
        if (this.state.temp === null) {
            if(this.props.match.params.woeid){
                getTemp(this.props.match.params.woeid).then((res) => {
                    this.setState({
                        temp: res.consolidated_weather,
                        name: res.title
                    });
                })
            }
            else{
                var a = [];
                getProductData(this.props.match.params.s).then(     //tra ve gia tri tim kiem
                    res1 => {
                        this.setState({
                            value1: res1
                        });
                        res1.map(value => 
                            getTemp(value.woeid).then(          // nhiet do
                                res2 => {
                                    a.push(res2.consolidated_weather);
                                    this.setState({
                                        value2: a
                                    });
                                }
                            )
                        )
                    }
                )
            }
        }
    }


    printDataTemp = () => {
        if (this.state.temp !== null) {
            if(this.props.match.params.woeid){
                return this.state.temp.map((value, index) => {
                    var a = value.applicable_date.split('-').map(Number);
                    var n = Math.floor((a[2]+2*a[1]+(3*(a[1]+1)) / 5 + a[0] + (a[0] / 4)) % 7);
                    var b = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                    var c;
                    for(var i=0; i<b.length;i++){
                        if(n === i){
                            c=b[i];
                        }
                    }
                    return(
                        <Weathers
                            key={index}
                            weather_state_name={value.weather_state_name}
                            date={c}
                            weather_state_abbr={value.weather_state_abbr}
                            applicable_date={value.applicable_date}
                            min_temp={value.min_temp}
                            max_temp={value.max_temp}
                            the_temp={value.the_temp}
                        />
                    )
                })
            }
        }
    }


    render() {
        // console.log(this.state.temp)
        // console.log(this.props.match.params.woeid)
        // console.log(this.props.match.params.s)
        // console.log(this.state.value1)
        // console.log(this.state.value2)
        if(this.state.value1 && this.state.value1.length === 0){
            return  <Redirect to="/NotFound" />;
        }
        var {value1,value2} = this.state;
        if((value1 && value2) !== null){
            var a = value1.map(v => v.title)
            return(
                value2.map((value, index) => {
                        return (
                            <Weathers
                                count={index}
                                key={index}
                                name={a[index]}
                                date={value[0].applicable_date}
                                weather_state_name={value[0].weather_state_name}
                                weather_state_abbr={value[0].weather_state_abbr}
                                applicable_date={value[0].applicable_date}
                                min_temp={value[0].min_temp}
                                max_temp={value[0].max_temp}
                                the_temp={value[0].the_temp}
                            />
                        )
                })
            )
        }


        return (
            <div>
                <div className="container-fluid mt-4">
                    <div className="row">
                        <div className="col-3 d-flex justify-content-between align-items-baseline">
                            <h1>{this.state.name}</h1>
                            <Link to="/" className="btn btn-primary mb-4">
                                Back Home
                            </Link>
                        </div>
                        <div className="col-9">
                            <div className="row">
                                {this.printDataTemp()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Weather;
