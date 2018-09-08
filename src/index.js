import app from "./app"
import initModel from "./model"
import update from "./update"
import view from "./view"

const node = document.getElementById("app")
const el = document.createElement("p")
el.innerHTML = initModel.description
node.appendChild(el)
//app(initModel, view, update, node)
