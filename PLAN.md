# Calorie Counter App Plan / Notes

## Data model

```javascript
meal = {
  id: 1
  , description: "Breakfast"
  , calories: 460
}

model = {
  meals: [
    {description: "Breakfast", calories: 460}
    , {description: "lunch", calories: 575}
    , {description: "snack", calories: 210}
  ]
  // show addMeal button vs addMeal form
  , showForm: false
  // addMeal form for adding / editing meal records
  , description: ""
  , calories: 0
  // options to handle saving a newly created or edited record(s)
  // , editId: 1
  // , nextId: 2
}

```
