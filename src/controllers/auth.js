import { db } from "../connect.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
    // check user if exist;
    const q = "select * from users where username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length) return res.status(409).json("User aleardy exists!");

        const salt = bcrypt.genSaltSync(10);

        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "insert into users(`username`, `password`) value(?)"

        const values = [req.body.username, hashedPassword];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
        });

    });


}
export const login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ status: "error", message: "Username and password are required." });
    }

    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [username], (err, data) => {
        if (err) return res.status(500).json({ status: "error", message: "Server error", error: err });

        if (data.length === 0) return res.status(404).json({ status: "error", message: "User not found" });

        const checkPassword = bcrypt.compareSync(password, data[0].password);

        if (!checkPassword) return res.status(400).json({ status: "error", message: "Wrong password or username!" });

        const token = jwt.sign({ id: data[0].id }, "secretkey", { expiresIn: '1h' });

        res.status(200).json({ status: "success", message: "Login successful", token });
    });
}
