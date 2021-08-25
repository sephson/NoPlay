const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send('<a href="/auth/google">Authenticate with google</a>')
});

app.get('/protected', (req, res)=>{
    res.send('Helloo')
})

app.listen(5000, () => console.log("Server running"));
