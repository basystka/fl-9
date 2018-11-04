import {pattern} from './utils/utils';
import {LOAD_MORE, FILTERED, REMOVE, addItems} from './actions/actions';
import {createStore} from './reducer/reducer';
import DATA from './data';
import './style.scss';

const SHOW_DEFAULT = 5;
const LOAD = 5;
const USERS = usersStore(DATA);
const root = document.getElementById('root');
root.innerHTML = pattern;
const HTML_DOM = {
    listOfUsers: document.getElementById('user-data'),
    loadMore: document.getElementById('loadMore'),
    input: document.getElementById('searchInput'),
    counter: document.querySelector('.counter'),
    display: document.getElementById('display'),
    extracted: document.getElementById('extracted')
};

function usersStore(defaultUsers) {
    let users = defaultUsers;
    let showItems = SHOW_DEFAULT;
    const takeUser = () => {
        return users;
    };
    const showDefault = () => {
        return users.slice(0, SHOW_DEFAULT);
    };
    const loadMore = () => {
        return users.slice(showItems, showItems += LOAD);
    };
    const deleteUser = (removeId) => {
        return users = users.filter((user) => user.id != removeId);
    };
    return {
        takeUser,
        showDefault,
        loadMore,
        deleteUser
    };
}

const renderUsers = (users) => {
    const pattern = users.map((user) => {
        return `
    <tr id=${ user.id }>
        <td class='avatar'><img src=${ user.picture } alt='${ user.name }' title='${ user.name }'></td>
        <td>${ user.name }</td>
        <td>${ user.location }</td>
        <td><a href="mailto:${ user.email }">${ user.email }</a></td>
        <td><a href="tel:${ user.phone }">${ user.phone }</a></td>
        <td>${ user.timezone }</td>
        <td><button class="delete">Remove</button></td>
    </tr>`;
    }).join('\n');
    HTML_DOM.listOfUsers.innerHTML = pattern;
};
const defState = USERS.showDefault();
const defAction = {
    type: 'Default'
};

const reducer = function(state = defState, action = defAction) {
    switch (action.type) {
    case LOAD_MORE:
    {
        if (action.value.length < LOAD) {
            HTML_DOM.loadMore.classList.add('addBottom');
            setTimeout(() => {
                HTML_DOM.loadMore.classList.add('invisible');
            }, 300);
        } else {
            HTML_DOM.loadMore.classList.remove('invisible', 'addBottom');
        }
        return [...state, ...action.value];
    }
    case REMOVE:
    {
        USERS.deleteUser(action.value);
        state = state.filter((user) => user.id != action.value);
        if (state.length < SHOW_DEFAULT) {
            return state = USERS.showDefault();
        };
        return state;
    }
    case FILTERED:
    {
        return state.filter((user) => {
            return user.name.indexOf(action.value) !== -1;
        });
    }
    }
    return state;
};

const store = createStore(reducer);

const displayExtracted = () => {
    HTML_DOM.display.innerText = store.getState().length;
    HTML_DOM.extracted.innerText = USERS.takeUser().length;
};

displayExtracted();
renderUsers(store.getState());
store.subscribe(displayExtracted);
store.subscribe(() => {
    renderUsers(store.getState());
});

HTML_DOM.loadMore.addEventListener('click', () => {
    const value = USERS.loadMore();
    const action = addItems(LOAD_MORE, value);
    store.dispatch(action);
});

HTML_DOM.input.addEventListener('keyup', (ev) => {
    const action = addItems(FILTERED, ev.target.value);
    store.dispatch(action);
});
HTML_DOM.listOfUsers.addEventListener('click', (ev) => {
    if (ev.target.classList.contains('delete')) {
        const id = ev.target.parentElement.parentElement.id;
        const action = addItems(REMOVE, id);
        store.dispatch(action);
    }
});