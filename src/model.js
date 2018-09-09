const initModel = {
  meals: [
    {description: "Breakfast", calories: 460}
    , {description: "lunch", calories: 575}
    , {description: "snack", calories: 210}
  ]
  , description: ""
  , calories: 0
  // show addMeal button vs addMeal form
  , showForm: false
  // addMeal form for adding / editing meal records
  // options to handle saving a newly created or edited record(s)
  // , editId: 1
  // , nextId: 2
}

export default initModel
