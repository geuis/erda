import {store} from 'stores/store';

const AppStore = () => {
  const state = {
    mapZoom: 10,
    arrr: [1, 2, 3],
    bob: {
      is: 'sailing',
      was: 'walking'
    }
  };

  store.update = state;
};

export default AppStore;
