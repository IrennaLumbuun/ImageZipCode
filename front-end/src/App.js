import './App.css';
import Footer from './components/Footer/Footer';
import Maps from './components/Maps/Maps';
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
          error_message: ''
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
      if (this.state.base64img === ''){
        alert("Make sure the input box is not empty!")
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
                      "lat": coord.lat,
                      "lon": coord.lon,
                      "name": coord.display_name
                    }
                    coords.push(location_dict)
                  })
                  this.setState({
                    img_info: coords
                  })
                }
                else {
                  // An actual location is retrieved
                  this.setState({
                    img_info: [{
                      "lat": data.lat,
                      "lon": data.lon,
                      "name": data.display_name,
                      "zipcode": data.address.postcode
                    }]
                  }, console.log(this.state.img_info))
                }
              }
              console.log(this.state.img_info)
          })
          .catch((response) => {
              //handle error
              console.log(response)
              alert("Error:", response);
          });
      }
  
    }

  
  render() {
    return (
        <div className="App">
          <Maps
            base64img = {this.state.base64img}
            locations = {this.state.img_info}
          />
          <section id="submit-image-section">
            <form action ={url} method ="post" onSubmit={this.handleSubmit} noValidate>
            <label className="container"> Get estimated locaton if fail to obtain zip code
              <input 
                  type="checkbox" 
                  name="allow_estimate"
                  checked={this.state.allow_estimate}
                  onChange={this.handleChange.bind(this)}
                  />
            </label>
            <div className="base64-string">
              <label htmlFor="base64-string">Base64:</label>
              <input
                  placeholder="base64 string"
                  type="text"
                  name="base64img"
                  onChange={this.handleChange}
                  noValidate
              />
            </div>
            <button type="submit">Show Location</button>
            </form>
          </section>
          <Footer/>
        </div>
      );
    }
};

export default App;
