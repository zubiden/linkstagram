import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import App from './App';
import "./css/global.scss";
import * as serviceWorker from './serviceWorker';
import store from './store';
import { IS_SAFARI } from './util/contants';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('app')
);

Modal.setAppElement('#app');

// vh on mobile is kinda funky
setVH();
window.addEventListener('resize', () => {
    setVH();
});

function setVH() {
    const vh = IS_SAFARI ? window.visualViewport.height :  window.innerHeight;
    document.documentElement.style.setProperty('--vh100', `${vh-1}px`);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
