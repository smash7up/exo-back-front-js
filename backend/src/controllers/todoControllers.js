const { sqlDb } = require('../../db');

const getTodos = (req, res) => {
    sqlDb
    .query("select * from todos")
    .then(([result]) => {
        console.log(result);
        res.status(200).json({ result });
    })
    .catch((err) => {
        console.log("There is an error in getTodos function");
        res.status(500).send(`Request error: ${err}`);
    });
};

const postTodos = (req, res) => {
    const { description } = req.body;

    sqlDb.query("INSERT INTO todos (description) VALUES (?)", [description])
    .then(([result]) => {
        res.status(201).json({id: result.insertId});
    })
    .catch((err) => {
        res.status(500).send(`Error in postTodos ${err}`);
    });
};

const updateTodos = (req, res) => {
    let { id } = req.params;
    id = parseInt(id, 10);
    const { description } = req.body;

    sqlDb
    .query("UPDATE todos SET description = ? WHERE id = ?", [description, id])
    .then(([result]) => {
        if (result.affectedRows === 0) {
            res.status(404).send("Not found");
        } else {
            res.status(201).send("update ok");
        }
    })
    .catch((err) => {
        res.status(500).json({message: `task ${id} was not updated because of error ${err}`});
    });
};

const deleteTodos =(req, res) => {
    let { id } = req.params;
    id = parseInt(id, 10); 

    sqlDb
    .query("DELETE FROM todos WHERE id = ?", [id])
    .then(([result]) => {
        if (result.affectedRows === 0) {
            res.status(404).json({message : `task was not found in DB because of wrong id`});
        } else {
            res.status(201).json({message : `task ${id} was deleted`});
        }
    })
    .catch((err) => {
        res.status(500).json({message : `task ${id} was not deleted because of error ${err}`});
    });
};


module.exports = {
    getTodos,
    postTodos,
    updateTodos,
    deleteTodos,
};