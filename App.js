import React, { Component } from "react";
import Main from "./components/MainComponent";
// redux
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/ConfigureStore";
// redux-persist
import { PersistGate } from "redux-persist/es/integration/react";
const { persistor, store } = ConfigureStore();

// const store = ConfigureStore();
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB22sohsEgpwvxhdBJJLXpjp_1KOjLnOOE",
  authDomain: "haihung-ddea2.firebaseapp.com",
  databaseURL: "https://haihung-ddea2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "haihung-ddea2",
  storageBucket: "haihung-ddea2.appspot.com",
  messagingSenderId: "132875614590",
  appId: "1:132875614590:web:ff085cd5641b6499c6db2f",
  measurementId: "G-2C75GS632X",
};

initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
