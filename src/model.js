const initModel = {
  description: "lunch"
  , calories: 480
  // show addMeal button vs addMeal form
  , showForm: false
  // addMeal form for adding / editing meal records
  // options to handle saving a newly created or edited record(s)
  // , editId: 1
  , nextId: 4
  , meals: [
    {id: 1, description: "Breakfast", calories: 460}
    , {id: 2, description: "lunch", calories: 575}
    , {id: 3, description: "snack", calories: 210}
  ]
}

export default initModel
