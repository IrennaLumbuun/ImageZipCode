import React, { Component } from 'react';
import './Logs.css'

export default class InfoLogs extends Component {
    render() {
        console.log(this.props)
        if (this.props.logs.length === 0){
            return (
                <p className="text-center">Uh, very empty. Try the submitting a base64 string!</p>
            )
        }
        return(
            <ul id="log-list-container" className="list-group">
                {this.props.logs.reverse().map((log, index) => 
                    <a href={"https://maps.google.com/?q="+log.lat +"," + log.lon} className="list-group-item log-list" target="_blank">
                        <div className="row">
                            <img src={"data:image/jpeg;base64," + this.props.base64s[index]} alt="base64 representation image" className="log-image col-sm-12 col-md-4 col-lg-4"/>
                            <p className="log-info col-sm-12 col-md-8 col-lg-6">{log.name}</p>
                        </div>
                        </a>
                    )}
            </ul>
        )
    }
}
