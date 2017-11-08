

## rrethunk
[![NPM Downloads](https://img.shields.io/npm/dm/rrethunk.svg?style=flat)](https://www.npmjs.com/package/rrethunk)
helpers for redux which reduces boilerplate code
## Actions

```js
// actions

const clear = (args)=>{
    return fetch('api')
}

// it will resolve this promise
// and trigger fetchData:busy while primise is loading
// and fetchData:success when promise is resolved
const fetchData = (args) => (dispatch, getState)=>{
    return fetch('api')
}


export const actions = createActions({
    fetchData,
    clear
}, {
    prefix: '@data/',
    meta: (args)=> ({ entity: args.entity })
})

dispatch(actions.fetchData({ entity: 'todo', info: 'bla lba' })) 
/**
 *  => {type: '@data/fetchData:loading', payload: { entity: 'todo',  info: 'bla lba' }', meta: { entity: 'todo' } }
 *  => {type: '@data/fetchData:success', payload:  {//thunk result}, meta: { entity: 'todo' } }
 *  or  => {type: '@data/fetchData:error', payload: {//error result}, meta: { entity: 'todo' } }
 *  or  => {type: '@data/fetchData:canceled', payload: null, meta: { entity: 'todo' } }
 * 
 */
actions.fetchData.error('something happened') => ({  }) // => {type: '@data/fetchData:error', payload: 'something happened' }
actions.fetchData.error('something happened', { user: 21 }) => ({  }) // => {type: '@data/fetchData:error', payload: 'something happened', meta: { user: 21 } }


// reducer
import actions from './actions'



const reducer = createReducer({})
.before(actions.fetchData, (state)=> ({ loading: true }))
.canceled(actions.fetchData, (state)=> ({}))
.on(actions.fetchData, (state, payload)=>{
    return payload.data
})
.onError(actions.fetchData, (state)=> ({}))

```


## custom combineReducer
```
const reducer = combineReducer({
    a: s=>s,
    b: s=>s
}).on(actions.done, (state, action)=>({
// state is {a, b}; 
return { a: state.a }
}))
```

# how to use
1. add redux-thunk middleware
2. just use it as plain actions



also there is actionState reducer which store state of each action

## to read
the idea of decoupling async actions and api repository 
https://medium.com/@david.losert_73564/dependency-inversion-with-redux-thunk-typescript-e09cebabdc1f
