const router = require("express").Router();
const key = require('../config/urls')
const controller = require('../controllers/bot');

const Learns = require('../models/learn.js');
const Subject = require('../models/subject.js');
const Users = require('../models/users.js');

router.post("/", controller.autoRepMessage );
router.get("/getUpdates",controller.getUpdates);

router.post('/updateSubject',(req,res) => {
    const learns = req.body.learns;
    const subject = new Subject(req.body.subject);
    const {user_id, name } = req.body.user;
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
    });

    Users.findOne({ user_id },(err,user) => {
        if(err) return res.status(500).json({message: "Error3"});
        else if( user ){
            user.subjects.push(subject);
            user.save(error => {
                if(error) return res.status(500).json({message: "Error4"});
                else return res.status(200).json({message: "Done"});
            });
        }
        else {
            let newSubjects = [subject];
            const newUser = new Users({
                user_id: user_id,
                name: name,
                subjects: newSubjects
            });
            newUser.save(error => {
                if(error) return res.status(500).json({message: "Error4"});
                else return res.status(200).json({message: "Done"});
            });
        }
    });

    
});

module.exports = router;