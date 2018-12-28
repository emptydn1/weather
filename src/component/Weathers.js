import React, { Component } from 'react';

class Weathers extends Component {

    abc = () => {
        var {name, weather_state_name, weather_state_abbr, applicable_date, date, min_temp, max_temp, the_temp } = this.props;
        if(this.props.name){
            return(
                <div className="card">
                    <div className="card-body">
                        <p>{name}</p>
                        <p>{applicable_date}</p>
                        <p>Max: {max_temp}</p>
                        <p>Min: {min_temp}</p>
                        <p>temp: {the_temp}</p>
                        <div className="group d-flex justify-content-between">
                            <p>{weather_state_name}</p>
                            <div className="state-icon-sml state-s" style={{backgroundImage: `url(https://www.metaweather.com/static/img/weather/${weather_state_abbr}.svg)`}}>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className="card">
                    <div className="card-body">
                        <p>{date}</p>
                        <p>{applicable_date}</p>
                        <p>Max: {max_temp}</p>
                        <p>Min: {min_temp}</p>
                        <p>temp: {the_temp}</p>
                        <div className="group d-flex justify-content-between">
                            <p>{weather_state_name}</p>
                            <div className="state-icon-sml state-s" style={{backgroundImage: `url(https://www.metaweather.com/static/img/weather/${weather_state_abbr}.svg)`}}>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }


    render() {
        
        return (
            <div className="col-3 mt-4 mb-4">
                {this.abc()}
            </div>
        );
    }
}

export default Weathers;
