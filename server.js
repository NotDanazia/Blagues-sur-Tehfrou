const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/voteButtons', { useNewUrlParser: true, useUnifiedTopology: true });

const buttonSchema = new mongoose.Schema({
    name: String,
    count: Number
});

const Button = mongoose.model('Button', buttonSchema);

app.get('/buttons', async (req, res) => {
    const buttons = await Button.find();
    res.json(buttons);
});

app.post('/increment', async (req, res) => {
    const { name } = req.body;
    const button = await Button.findOne({ name });
    if (button) {
        button.count += 1;
        await button.save();
    } else {
        await Button.create({ name, count: 1 });
    }
    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
