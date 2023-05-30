const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/UserData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log(`connection successful : UPLODER DB`);
}).catch((e) => {
    console.log(`no connection`);
})