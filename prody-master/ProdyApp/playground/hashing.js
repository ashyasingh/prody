const bcrypt = require('bcryptjs');

const mypass = 'Ufth6Zds';



    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(mypass, salt, function(err, hash) {
            console.log(hash);
        });
    });








const myhash ='';

//
// bcrypt.compare(mypass, myhash).then((res) => {
//     console.log(res);
// });


// for (i = 5; i < 10 ; i++) {
//     console.log(eval(`mypass${i}`))
// }