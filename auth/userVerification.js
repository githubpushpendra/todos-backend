// const {User} = '../db-config/mongo-db.js'

function verifyUser(user){
    const emailPatter = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(user == null) return "Please enter user details";
    if(user.email === undefined) return "Please enter user email";
    else if(!emailPatter.test(user.email)) return "Kindly enter valid email";

    const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(user.password === undefined) return "Please set a valid password like ABab@87 of lenght at least 8";
    else if(!passPattern.test(user.password)) return "Kindly set valid password";

    return true;
}

module.exports = verifyUser