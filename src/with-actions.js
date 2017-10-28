import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


export const withActions = (actions, propName) => {
  let mapDispatch = dispatch => bindActionCreators(actions, dispatch)
  if (propName) {
    mapDispatch = dispatch => ({
      actions: bindActionCreators(actions, dispatch),
    })
  }
  return connect(null, mapDispatch)
}

export const withActionsConnect = (
  actions,
  propsName = 'actions'
) => dispatch => ({
  [propsName]: bindActionCreators(actions, dispatch),
})
