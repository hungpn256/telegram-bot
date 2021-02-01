const router = require("express").Router();
const key = require('../config/urls')
const controller = require('../controllers/bot');

const Learns = require('../models/learn.js');
const Subject = require('../models/subject.js');

router.post("/", controller.autoRepMessage );
router.get("/getUpdates",controller.getUpdates);

router.post('/updateSubject',(req,res) => {
    const learns = req.body.learns;
    const subject = new Subject(req.body.subject);
    for(var value of learns){
        const learn = new Learns(value);
        learn.save(err  => {
            if(err) return res.status(500).json({message: "Error1"});
            else{
                subject.schedule.push(learn);
            }
        });
    }
    subject.save( err => {
        if(err) return res.status(500).json({message: "Error2"});
        else return res.status(200).json({message: "Done"});
    })
});

module.exports = router;