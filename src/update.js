import * as R from "ramda"

const MSGS = {
  SHOW_FORM: "SHOW_FORM"
  , DESCRIPTION_INPUT: "DESCRIPTION_INPUT"
  , CALORIES_INPUT: "CALORIES_INPUT"
  , SAVE_FORM: "SAVE_FORM"
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

export const saveFormMsg = {type: MSGS.SAVE_FORM}

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
    return {
      ..._model
      , description: _msg.description
    }
  }
  if (_msg.type === MSGS.CALORIES_INPUT) {
    const calories = R.compose(
      R.defaultTo(0)
      , parseInt
    )(_msg.calories)

    return {
      ..._model
      , calories // obj literal prop notation
    }
  }
  if (_msg.type === MSGS.SAVE_FORM) {
    return add(_msg, _model)
  }

  return _model
}

// helpers
function add(_msg, _model) {
  const {nextId, description, calories} = _model
  const meal = {
    id: nextId
    , description
    , calories
  }
  const meals = [
    ..._model.meals
    , meal
  ]
  return {
    ..._model
    , meals
    // reset / update model for form
    , nextId: nextId + 1
    , description: ""
    , calories: 0
    , showForm: false
  }
}

export default update
