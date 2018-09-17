import * as R from "ramda"

const MSGS = {
  SHOW_FORM: "SHOW_FORM"
  , DESCRIPTION_INPUT: "DESCRIPTION_INPUT"
  , CALORIES_INPUT: "CALORIES_INPUT"
  , SAVE_FORM: "SAVE_FORM"
  , DELETE_RECORD: "DELETE_RECORD"
  , EDIT_RECORD: "EDIT_RECORD"
}

export function editRecordMsg(_id) {
  return {
    type: MSGS.EDIT_RECORD
    , editId: _id
  }
}

export function deleteRecordMsg(_id) {
  return {
    type: MSGS.DELETE_RECORD
    , id: _id
  }
}

export const saveFormMsg = {type: MSGS.SAVE_FORM}

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
    // return add(_msg, _model)
    const {editId} = _model
    const updatedModel = editId !== null ? edit(_msg, _model) : add(_msg, _model)
    return updatedModel
  }
  if (_msg.type === MSGS.DELETE_RECORD) {
    const {id} = _msg
    // return new array with selected meal filtered out
    const meals = R.filter(meal => meal.id !== id, _model.meals)
    return {
      ..._model
      , meals
    }
  }
  if (_msg.type === MSGS.EDIT_RECORD) {
    const {editId} = _msg
    // get selected meal record
    const meal = R.find(meal => meal.id === editId, _model.meals)

    const {description, calories} = meal

    return {
      ..._model
      , description
      , calories
      , editId
      , showForm: true
    }
  }
  // default case
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

function edit(_msg, _model) {
  const {editId, description, calories} = _model
  const meals = R.map(meal => {
    // replace with find fn
    if (meal.id === editId) {
      return {
        ...meal
        , description
        , calories
      }
    } else {
      return meal
    }
  }, _model.meals)
  return {
    ..._model
    , meals
    , description: ""
    , calories: 0
    , showForm: false
    , editId: null
  }
}

export default update
