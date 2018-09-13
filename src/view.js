
import {h} from "virtual-dom"
import hh from "hyperscript-helpers"

import {
  showFormMsg
  , descriptionInputMsg
  , caloriestInputMsg
} from "./update"

const {pre, div, h1, button, form, label, input} = hh(h)

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
      {className: "w-100 mv2"}
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
    // creates pre-tag for pre-formated text
    , pre( JSON.stringify(_model, null, 2) )
  ])
}

export default view
