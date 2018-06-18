import styled from 'react-emotion';
import leaflet from 'leaflet/dist/leaflet.css';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  outline: 2px solid #000ccc;

  ${leaflet}

  .map-component {
    width: inherit;
    height: inherit;
  }
`;
