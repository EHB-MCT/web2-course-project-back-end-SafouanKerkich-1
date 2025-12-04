const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World GET!");
});

app.post("/login", (req, res) => {
    // const {name, password} = req.body {
    //     res.send(name);
    // }

    const login = req.body;
    console.log(login);

    if (login.username !== "Safouan" || login.password !== "Kerkich494") {
        return res.status(401).json({
            error: "Invalid credentials (error 401)",
        });
    } else {
        res.send({ message: "Login succesful" });
    }

    res.send("Hello World POST!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});