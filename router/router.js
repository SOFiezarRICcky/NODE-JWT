const adminController = require("../controller/adminController")
const middleware = require("../middleware/middleware")

module.exports = app => {
    app.get("/login", adminController.login)
    app.post("/proses", adminController.token)
}