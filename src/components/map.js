import React from 'react';
import PropTypes from 'prop-types';
import {Map, TileLayer} from 'react-leaflet';
import {Wrapper} from 'components/map.style';
import {store, attach} from 'stores/store';

class MapComponent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      center: [51.505, -0.09],
      // zoom: 13
    };
  }

  componentDidMount () {}

  render () {
    return (
      <Wrapper>
        <Map className="map-component"
          animate={true}
          center={this.state.center}
          zoom={this.props.mapZoom}
        >
        {/* zoom={store.mapZoom} */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
          </TileLayer>
        </Map>
      </Wrapper>
    );
  }
}

MapComponent.propTypes = {
  mapZoom: PropTypes.number
};

// export default attach(MapComponent);
export default MapComponent;
