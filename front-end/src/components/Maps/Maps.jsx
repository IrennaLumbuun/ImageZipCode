import React from "react";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './Maps.css';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';


L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

class Maps extends React.Component {

  static propTypes = {
    items: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      default_location: {
        lat: 34.01819,
        lng: -118.50005,
        name: "Enterprise Vision Technology"
      },
      zoom: 10,
      locations: []
    };
  }

  showMarker = (locations) => {
    console.log(locations)
    return (
      locations.map(item => (
        <Marker position={[item.lat, item.lng]}>
          <Popup>
            <p><em>{item.name}</em></p>
          </Popup>
        </Marker>
      ))
    );
  }

  renderDefault = () => {
    var location = [this.state.default_location.lat, this.state.default_location.lng];
    return (
      <MapContainer className="map" zoom={this.state.zoom} center={location}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.showMarker([this.state.default_location])}
      </MapContainer>
    );
  }

  // renderLocation() {
  //   return (
  //     <MapContainer className="map" zoom={10} center={[this.state.filtered[0].coord[0],this.state.filtered[0].coord[1]]}>
  //       <TileLayer
  //         attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //       />
  //       {this.showMarker()}
  //     </MapContainer>
  //   );
  // }

  render() {
    return (
      this.renderDefault()       
    );
  }
};

export default Maps;

