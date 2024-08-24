import { db } from "../connect.js";

export const createTask = (req, res) => {
    // check user if exist;
    const userId = req.userId;
    const q = "select * from users where `id` = ?";

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);

        if (!data.length) return res.status(409).json("User not exists!");

        const q = "insert into tasks(`title`, `description`, `status`, `priority`,`due_date`,`userId`) value(?)"

        const values = [req.body.title, req.body.description, req.body.status, req.body.priority, req.body.due_date, userId,];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json({ message: "Task has been created." });
        });
    });


}
export const updateTask = (req, res) => {
    const userId = req.userId;
    const taskId = req.params.id;
    const q = "UPDATE tasks SET `title` = ?, `description` = ?, `status` = ?, `priority` = ?, `due_date` = ? WHERE `id` = ? AND `userId` = ?";

    const values = [
        req.body.title,
        req.body.description,
        req.body.status,
        req.body.priority,
        req.body.due_date,
    ];

    db.query(q, [...values, taskId, userId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows === 0) return res.status(404).json("Task not found!");
        return res.status(200).json("Task has been updated.");
    });
};


export const deleteTask = (req, res) => {
    const userId = req.userId;
    const taskId = req.params.id;
    const q = "DELETE FROM tasks WHERE `id` = ? AND `userId` = ?";

    db.query(q, [taskId, userId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows === 0) return res.status(404).json("Task not found!");
        return res.status(200).json("Task has been deleted.");
    });
};


export const listTask = (req, res) => {
    const userId = req.userId;

    const q = "SELECT * FROM tasks WHERE userId = ?";

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json({ status: "error", message: "Server error", error: err });

        return res.status(200).json({ status: "success", tasks: data });
    });
};
