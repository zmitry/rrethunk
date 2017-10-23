## Actions 

helpers for redux which reduces boilerplate code

```
// actions

const clear = (args)=>{
    return fetch('api')
}

// it will resolve this promise 
// and trigger fetchData:busy while primise is loading
// and fetchData:success while promise is resolved
const fetchData = (args) => (dispatch, getState)=>{
    return fetch('api')
}


export default createActions({
    fetchData,
    clear
}, {
    prefix: '@data',
    meta: (args)=> ({ entity: args.entity })
})
```

```
// reducer
import actions from './actions'

const reducer = createReducer({})
.on(actions.fetchData, (state, payload)=>{
    return payload.data
})
.on(actions.clear, (state)=> ({}))
```


# how to use
1. add redux-thunk middleware
2. just use it as plain actions



also there is actionState reducer which store state of each action
