import './App.css';
import Footer from './components/Footer/Footer';
import Maps from './components/Maps/Maps';
import InfoLogs from './components/Logs/Logs';
import React from "react";
import axios from 'axios';

const url = "http://127.0.0.1:5000/post"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
          allow_estimate: false,
          base64img: '',
          img_info: [],
          error_message: '',
          pass_base64: [],
          logs:[]
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
    }
  
    handleSubmit = (event) => {
      event.preventDefault();
      this.setState({
        error_message: ''
      })

      if (this.state.base64img === ''){
        this.setState({
          error_message: 'Make sure the input box is not empty'
        })
      }
      else{
        let bodyFormData = {
          'base64': this.state.base64img
        }
        console.log(bodyFormData);
        axios({
          method: 'post',
          url: url,
          data: JSON.stringify(bodyFormData),
          headers: {'Content-Type': 'application/json' }
          })
          .then((response) => {
              const data = response.data
              // No errors when processing image
              if (data.success){
                if (data.probabilistic){
                  // Unable to find the actual location
                  let coords = []
                  data.address.map(coord => {
                    const location_dict  = {
                      "lat": parseFloat(coord.lat),
                      "lon": parseFloat(coord.lon),
                      "name": coord.display_name
                    }
                    coords.push(location_dict)
                  })
                  this.setState({
                    img_info: coords,
                    pass_base64:this.state.pass_base64.concat(this.state.base64img),
                    logs: this.state.logs.concat(coords)
                  })
                }
                else {
                  // An actual location is retrieved
                  const img_info = {
                    "lat": parseFloat(data.lat),
                    "lon": parseFloat(data.lon),
                    "name": data.display_name,
                    "zipcode": data.address.postcode
                  }
                  this.setState({
                    img_info: [img_info],
                    pass_base64:this.state.pass_base64.concat((this.state.base64img)),
                    logs: this.state.logs.concat(img_info)
                })
              }
            } 
              else {
                this.setState({
                  error_message: data.error
                })
              }
              console.log(this.state) //debug
          })
          .catch((response) => {
              //handle error
              this.setState({
                error_message: response.message
              })
          });
      }
  
    }

  
  render() {
    return (
        <div className="App">
            <section id="submit-image-section" className="container">
            <h1 className="text-center mt-3">Get Image Location</h1>
            {/* TEMPORARILY DISABLED - until we figure out what's wrong
            <Maps/>
            */}
            <form action ={url} method ="post" onSubmit={this.handleSubmit} noValidate>
              {/* TEMPORARILY DISABLED - until we developed the backend functionality for this
              <label className="container"> Get estimated locaton if fail to obtain zip code
                <input 
                    type="checkbox" 
                    name="allow_estimate"
                    checked={this.state.allow_estimate}
                    onChange={this.handleChange.bind(this)}
                    />
                </label>*/}
            <div className="base64-string form-group">
              <label for="base64-string" className="text-left">Base64: </label>
              <textarea
                  id="base64-string"
                  placeholder="base64 string"
                  type="text"
                  name="base64img"
                  className="form-control"
                  onChange={this.handleChange}
                  noValidate
              />
            </div>
            <p className="text-danger text-center">{this.state.error_message}</p>
            <button type="submit" className="btn btn-outline-dark">Show Location</button>
            </form>
            <h3 className="text-left mt-4">Logs:</h3>
            <InfoLogs 
                logs={this.state.logs}
                base64s={this.state.pass_base64}/>
          </section>
          <Footer/>
        </div>
      );
    }
};

export default App;
