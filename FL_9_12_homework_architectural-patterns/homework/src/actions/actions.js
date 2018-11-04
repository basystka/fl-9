const LOAD_MORE = 'LOAD_MORE';
const FILTERED = 'FILTERED';
const REMOVE = 'REMOVE';

function addItems(type, value) {
    return {type: type, value: value};
}

export {LOAD_MORE, FILTERED, REMOVE, addItems};