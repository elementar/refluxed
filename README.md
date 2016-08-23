# refluxed

> Connecting React Components with [Reflux][r] Stores in a clean way

## Installation

```
$ npm install --save refluxed
```

## Usage

You'll write your component to receive all its data as `props` – most likely you can write
it as a stateless component:

```jsx
function UserList({ users, header }) {
  return (
    <div>
      <h1>{ header }</h1>
      <ul>
        { users.map(u => <li>{u.name}</li>) }
      </ul>
    <div>
  );
}
```

Then, before using your component on your app, you use the `Refluxed` method to
wrap your component into another (the [High-Order Component][h]), which will then
listen to the stores you need and pass on their data as `props`:

```jsx
import Refluxed from 'refluxed';

const ConnectedUserList = Refluxed(UserList, { users: UserStore });

function MyApp() {
  render (
    <div>
      <h1>Welcome</h1>
      <p>Welcome to our app</p>
      <ConnectedUserList header="User List" />
    </div>
  );
}
```

## License

MIT © [Elementar Sistemas](http://elementarsistemas.com.br)

[r]: https://github.com/reflux/refluxjs
[h]: https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.7ld736rgp