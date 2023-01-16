const express = require('express')
const app = express();
app.use(express.json())

require('dotenv').config()
const cors = require('cors')
app.use(cors())

const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

app.post('/insert', (req, res) => {
    // console.log(req.body)
    const datasetpath = req.body.datasetpath
    const trainratio = req.body.trainratio
    const testratio = req.body.testratio
    const valratio = req.body.valratio
    console.log(trainratio, testratio, valratio)

    statement = 'INSERT INTO operation_info(dataset_path, train_ratio, test_ratio, val_ratio, user_id) VALUES(?, ?, ?, ?, ?)'
    db.query(statement, [datasetpath, trainratio, testratio, valratio, 1],
        (err, result) => {
            if (err) { console.log(err) }
            else { res.send('values inserted') }
        }
    )
})

app.listen(3001, ()=>{ console.log(`Express server active on port 3001`) })