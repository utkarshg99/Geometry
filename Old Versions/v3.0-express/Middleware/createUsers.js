let User = require('./userSchema');
let Incdata = require('./incdataSchema');
let Retdata = require('./retdataSchema');

function makeUser(username, incoming) {
    let newuser = new User({
        _id: new mongoose.Types.ObjectId(),
        name: username
    });
    newuser.save(function (err) {
        if (err) throw err;
        console.log('User Created');
        let newincdata = new Incdata({
            _id: new mongoose.Types.ObjectId(),
            statement: incoming,
            user: newuser._id
        });
        newincdata.save(function (err) {
            if (err) throw err;
            console.log('Incoming Data Recorded');
            // let newrecdata = new Retdata({
            //     _id: new mongoose.Types.ObjectId(),
            //     user: newuser._id
            // });
            // newrecdata.save(function (err) {
            //     if (err) throw err;
            //     console.log('Receiver for data created');
            // })
        });
    });
}