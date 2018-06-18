import React from 'react';
import {store, attach} from 'stores/store';
import MapComponent from 'components/map';
import {Wrapper} from 'components/app.style';
// Data sources https://aws.amazon.com/earth/
// https://earthdata.nasa.gov/about/science-system-description/eosdis-components/global-imagery-browse-services-gibs
// -- attribution: We acknowledge the use of imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/Goddard Space Flight Center Earth Science Data and Information System (ESDIS) project.

class App extends React.Component {
  constructor (props) {
    super(props);

    setInterval(() => {
      store.mapZoom = Math.floor(Math.random() * 10);

      // store.update = {
      //   mapZoom: Math.floor(Math.random() * 10),
      //   test: {bob: !store.test.bob}
      // }
      // const arr = [...store.arrr];
      // arr.push(store.mapZoom);

      // store.arrr = arr;

    }, 1000);

    // setTimeout(() => {
    //   const bobState = {...store.bob};
    //   delete bobState.was;
    //   console.log('#', bobState);
    //   store.bob = bobState;
    //   console.log('##', store.bob);
    // }, 2000);
  }

  render () {
    const Zoom = attach(() =>
      <div>{store.mapZoom}</div>
    );

    const Pirate = attach(() =>
      <div>{store.arrr}</div>
    );

    const Bob = attach(() => 
      <div>{store.bob.is} | {store.bob.was}</div>
    );

    return (
      <Wrapper>
        <Zoom></Zoom>
        {/* <Pirate></Pirate> */}
        {/* <Bob></Bob> */}

        <MapComponent mapZoom={store.mapZoom}></MapComponent>
        {/* <MapComponent></MapComponent> */}
      </Wrapper>
    );
  }
}

// export default App;
export default attach(App);
