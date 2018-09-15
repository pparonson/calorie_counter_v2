
import {h} from "virtual-dom"
import hh from "hyperscript-helpers"
import * as R from "ramda"

import {
  showFormMsg
  , descriptionInputMsg
  , caloriestInputMsg
  , saveFormMsg
} from "./update"

const {pre, div, h1, button, form, label, input, td, tr, tbody, table, thead, th} = hh(h)

// Plan / fns to createElement:
// cell, mealRow, headerRow, totalRow, mealBody, mealHeader, mealsTable
function headerRow(_className) {
  return tr({className: _className}, [
    cell(th, "pa2", "Description")
    , cell(th, "pa2", "Calories")
    , cell(th, "")
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
    cell(td, "pa2 tr", "TOTAL")
    , cell(td, "pa2 tr", total)
    , cell(td, "", "")
  ])
}

function _table(_className, _meals) {
  return table({className: _className}, [
    tableHead("")
    , tableBody("", _meals)
  ])
}

function tableBody(_className, _meals) {
  // rows is an array of table row elements
  const rows = R.map(R.partial(tableRow, ["stripe-dark"]), _meals)
  return tbody({className: _className}, [
    ...rows
    , totalRow("stripe-dark", _meals)
  ])
}

function tableRow(_className, _model) {
  return tr({className: _className}, [
    cell(td, "pa2", _model.description)
    , cell(td, "pa2 tr", _model.calories)
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
    , _table("w-100 collapse mv2", _model.meals)
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
