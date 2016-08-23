'use strict';

import React from 'react';

/**
 * Inspired by {@link https://github.com/stoeffel/reflux-hoc}.
 *
 * Defines a HOC (High Order Component) which wraps the specified component
 * and listens to the informed stores, feeding the props of the wrapped component.
 *
 * @param ComposedComponent the component to wrap.
 * @param stores an object containing the keys and stores. Whenever an store sends new data,
 *               it will be added to the props of the wrapped component, using the specified key.
 * @returns {*} the new HOC
 * @constructor
 */
export default function Refluxed(ComposedComponent, stores) {
  const keys = Object.keys(stores);

  return class extends React.Component {
    static displayName = `Refluxed(${ComposedComponent.name},${keys.join(',')})`;

    constructor() {
      super();
      this.state = {};
    }

    componentDidMount() {
      this.unsubscribe = Object.keys(stores).map(key => {
        const store = stores[key];
        if (store.getInitialState) {
          const is = store.getInitialState();
          if (is.then)
            is.then(r => this.setState({ [key]: r }));
          else
            this.setState({ [key]: is });
        }
        return store.listen(data => this.onChange(key, data));
      });
    }

    onChange(key, data) {
      this.setState({ [key]: data });
    }

    componentWillUnmount() {
      this.unsubscribe.map(unsubscribe => unsubscribe());
    }

    render() {
      return <ComposedComponent {...this.props} {...this.state} />;
    }
  };
}