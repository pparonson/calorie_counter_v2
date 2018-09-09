import app from "./app"
import view from "./view"
import update from "./update"
import initModel from "./model"

const node = document.getElementById("app")
// const el = document.createElement("p")
// el.innerHTML = initModel.description
// node.appendChild(el)

app(view, update, node, initModel)
