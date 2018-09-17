
import {h} from "virtual-dom"
import hh from "hyperscript-helpers"
import * as R from "ramda"

import {
  showFormMsg
  , descriptionInputMsg
  , caloriestInputMsg
  , saveFormMsg
  , deleteRecordMsg
  , editRecordMsg
} from "./update"

const {
  pre
  , div
  , h1
  , button
  , form
  , label
  , input
  , td
  , tr
  , tbody
  , table
  , thead
  , th
  , i
} = hh(h)

// Plan / fns to createElement:
// cell, mealRow, headerRow, totalRow, mealBody, mealHeader, mealsTable
function headerRow(_className) {
  return tr({className: _className}, [
    cell(th, "pa2 bg-gray white", "Description")
    , cell(th, "pa2 bg-gray white", "Calories")
    , cell(th, "pa2 bg-gray white", "")
  ])
}

function tableHead(_className) {
  return thead({className: _className}, [
    headerRow("")
  ])
}

function totalRow(_className, _meals) {
  const total = R.compose(
    getTotalCalories
    , getCalories
  )(_meals)
  return tr({className: _className}, [
    cell(td, "pa2 tr bg-gray white", "TOTAL")
    , cell(td, "pa2 tr bg-gray white", total)
    , cell(td, "pa2 bg-gray white", "")
  ])
}

function _table(_dispatch, _className, _meals) {
  if (_meals.length === 0) {
    return div({className: "mv2 i black-50"}, "No meals to display...");
  }
  return table({className: _className}, [
    tableHead("")
    , tableBody(_dispatch, "", _meals)
  ])
}

function tableBody(_dispatch, _className, _meals) {
  // rows is an array of table row elements
  const rows = R.map(R.partial(tableRow, [_dispatch, "stripe-dark"]), _meals)
  return tbody({className: _className}, [
    ...rows
    , totalRow("stripe-dark", _meals)
  ])
}

function tableRow(_dispatch, _className, _meal) {
  return tr({className: _className}, [
    cell(td, "pa2", _meal.description)
    , cell(td, "pa2 tr", _meal.calories)
    , cell(td, "pa2 tr", [
      i({
        className: "ph1 fas fa-pen dim pointer"
        , onclick: () => _dispatch(editRecordMsg(_meal.id))
      })
      , i({
        className: "ph1 fas fa-trash dim pointer"
        , onclick: () => _dispatch(deleteRecordMsg(_meal.id))
      })
    ])
  ])
}

function cell(_tag, _className, _data) {
  return _tag({className: _className}, _data)
}

function buttonSet(_dispatch) {
  return div(
    {className: ""}
    , [
      button(
        {className: "f3 pv2 ph3 bg-blue white bn r2 mr3 dim", type: "submit"}
        , "Save"
      )
      , button(
        {
          className: "f3 pv2 ph3 bg-gray white bn r2 dim"
          , type: "button"
          , onclick: () => _dispatch(showFormMsg(false))
        }
        , "Cancel"
      )
    ]
  )
}

function fieldSet(_labelText, _inputValue, oninput) {
  return div(
    {className: ""}
    , [
      label({className: "db mb1"}, _labelText)
      , input(
        {
          className: "pa2 input-reset ba w-100 mb2"
          , type: "text"
          , value: _inputValue
          , oninput
        })
    ]
  )
}

function formView(_dispatch, _model) {
  const {description, calories, showForm} = _model
  if (showForm) {
    return form(
      {className: "w-100 mv2", onsubmit: (e) => {
        e.preventDefault() // prevent default get/post to server
        , _dispatch(saveFormMsg)
      }}
      , [
        fieldSet("DESCRIPTION", description, e => _dispatch(descriptionInputMsg(e.target.value)))
        // if calories is 0, then display empty cell
        , fieldSet("CALORIES", calories || "", e => _dispatch(caloriestInputMsg(e.target.value)))
        , buttonSet(_dispatch)
      ]
    )
  } else {
    return button(
      {
        className: "f3 pv2 ph3 bg-blue white bn br2"
        , onclick: () => _dispatch(showFormMsg(true))
      }
      , "Add Meal"
    )
  }
}

function view(_dispatch, _model) {
  return div({className: "mw6 center"}, [
    h1({className: "f2 pv2 bb"}, "Calorie Counter")
    , formView(_dispatch, _model)
    , _table(_dispatch, "w-100 collapse mv2", _model.meals)
    // creates pre-tag for pre-formated text
    , pre( JSON.stringify(_model, null, 2) )
  ])
}

// helpers
function getTotalCalories(_calories) {
  return R.reduce(R.add, 0, _calories)
}

function getCalories(_meals) {
  return R.map(meal => meal.calories, _meals)
}

export default view
