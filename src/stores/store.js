import React from 'react';

const Proxy = window.Proxy || undefined;

if (!Proxy) {
  throw new Error('Proxy is not supported in this environment.');
}

const isObject = (value) => value && typeof value === 'object'
  && value.constructor === Object;

const reRender = () => {
  for (const key in componentCache) {
    componentCache[key]();
  }
}

let componentId = 0;
let componentCache = {};

/* 
API:
  store.state: Return the current state of the store. Should be set protected. Throw error?
  store.update: Update the entire state with an object. Get protected. Set protected when value is not an object
*/

/* 
  Usage:
  Direct assignment: store.foo = 'bar', store.foo = {bar: true};
  Update/add multiple properties (useful during store setup) using Object.assign: 
    store.update({foo: 'bar', pirate: 'arrr'})
  Never operate directly on store arrays and objects. Make copies, modify, then assign
*/

export const store = new Proxy({}, {
  get: (target, name) => {
    if (name === 'state') {
      return target;
    }

    return target[name];
  },

  set: (target, name, value) => {
    if (name === 'state') {
      throw new Error(
        'The state property is protected. ' +
        'Use "store.update" to update multiple properties.'
      );
    }

    if (name === 'update') {
      if (isObject(value)) {
        target = Object.assign(target, value);
        reRender();
      } else {
        throw new Error('Update value must be an object literal');
      }

      return true;
    }

    // should always replace if primitives differ, or if objects or arrays
    // are being updated
    if (target[name] !== value) {
      target[name] = value;
      reRender();
    }

    return true;
  }
});

export const attach = (AttachedComponent) => {
  return class Attached extends React.Component {
    constructor (props, context) {
      super(props, context);

      this.id = componentId++;
      this.state = {};
    }

    componentDidMount () {
      componentCache[this.id] = this.reRender.bind(this);
    }

    componentWillUnmount () {
      delete componentCache[this.id];
    }

    reRender () {
      this.setState({});
    }

    render () {
      return (
        <AttachedComponent {...this.props}></AttachedComponent>
      );
    }
  }
};
