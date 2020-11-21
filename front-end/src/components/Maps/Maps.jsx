import React from "react";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './Maps.css';
import 'leaflet/dist/leaflet.css';

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

class Maps extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props.locations)
    console.log(this.props.base64img)

    this.state = {
      default_location: {
        lat: 34.01819,
        lon: -118.50005,
        name: "Enterprise Vision Technology"
      },
      zoom: 10
    }
  }

  getImageInfo = (item) => {
    return (
      Object.keys(item).forEach((key) =>{
        <p className="main-image-section-info" id="main-image-section-info-{item.name}">{item[key]}</p>
      })
    );
  }
  
  getImageDiv = (item) => {
      return (
          <section id="main-image-section">
              <img src="data:image/jpeg;base64,{this.state.base64img}" alt="base64 representation image" id="main-image-section-image"/>
              <article>
              {this.getImageInfo(item)}
              </article>
        </section>
      )
  }

  showMarker = () => {
    return (
      this.props.locations.map(item => (
        <Marker position={[item.lat, item.lon]}>
          <Popup>
            <p><em>{this.getImageDiv(item)}</em></p>
          </Popup>
        </Marker>
      ))
    );
  }

  // No data has been passed yet
  // Render an empty map instead
  renderDefault = () => {
    var location = [this.state.default_location.lat, this.state.default_location.lon];
    return (
      <MapContainer className="map" zoom={this.state.zoom} center={location}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    );
  }

  renderLocation() {
    return (
      <MapContainer className="map" zoom={10} center={[this.props.locations[0].lat, this.props.locations[0].lon]}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.showMarker()}
      </MapContainer>
    );
  }

  render() {
    return (
      this.props.locations.length === 0 ? this.renderDefault() : this.renderLocation()        
    );
  }
};

export default Maps;

