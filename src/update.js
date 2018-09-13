const MSGS = {
  SHOW_FORM: "SHOW_FORM"
  , DESCRIPTION_INPUT: "DESCRIPTION_INPUT"
  , CALORIES_INPUT: "CALORIES_INPUT"
}

export function descriptionInputMsg(_description) {
  return {
    type: MSGS.DESCRIPTION_INPUT
    , description: _description
  }
}

export function caloriestInputMsg(_calories) {
  return {
    type: MSGS.CALORIES_INPUT
    , calories: _calories
  }
}

export function showFormMsg(_showForm) {
  return {
    type: MSGS.SHOW_FORM
    , showForm: _showForm
  }
}

function update(_msg, _model) {
  if (_msg.type === MSGS.SHOW_FORM) {
    // update the model
    return {
      ..._model
      , showForm: _msg.showForm // updated prop
      , description: ""
      , calories: 0
    }
  }
  if (_msg.type === MSGS.DESCRIPTION_INPUT) {
    return {..._model , description: _msg.description}
  }
  if (_msg.type === MSGS.CALORIES_INPUT) {
    return {..._model , calories: _msg.calories}
  }
  return _model
}

export default update
