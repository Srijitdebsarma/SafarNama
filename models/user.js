//this is the database models

const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema= new Schema({
    email : {
        type : String,
        required : true,
    }
    //passport automatically handle username and password salting+hashing
    //also do some hashing and salting

    //it also adds some methods- setPassword, changePassword,authenticate
    //like methods
})

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);


// {
//     "email": "srijitDebsarma",
//     "_id": "661fa4734e511b7f285ad9be",
//     "username": "SrijitDebsarma",
//     "salt": "d886569cb4ba793b4ca4625330102c6c99deae8c95c689cee458000063847073",
//     "hash": "e2688c70914fce8dea03063bb3fa875d45e7546fdfaf79fb7aa01116854d2919df498289fc9adb53361db1dfaa31598c33cdb39d40d29a1b60948ad718cafe9c66d99f33e3874a481190599d1bace22ff29c8ece6658806eddf5776ccccc887786378757c738f87ad76507957dfb416e02a34bacfd71de52417584791f58688da41f6ea74144b409cc277f562d912434270f73bcfbfb70674f4cfc6d6c454e5ff36375b52c8e532ce042b15d943157a450faa8fa719a3e880f7ecbc788395a8282f4717763fd26687f9422961fa73022800e08c2ba1f7dc42ceddf649984e8dc6f3ca1443bf426a869f0aa3ad9ffccfdc3cb5adca0327563d2f8ce42b2aff317de12d05c855adbaa8479dac003a1e293da9b9834dc7d94274dec039de5b657919c665641ecbe9d1e008c1202a9baaf2307e55f15d5db78556b6efe8004f180b2be9d2fab446c88b6d6d622375648c3553cfeb4c8c9bac885f5a695ca49c82f9c10b84df4a2afc78371c4a35d84c50b6b4cdd4c940a0d30330a4d4d05a838eb2aa8aecd45b0a64a5ac94268c92d202774969cfd6e77d2dd7b468f57c86fafca645080aef7c4a4ebfa8a4cb2d2cf0e9c89a96b7040714b900911fc66c91ff6d797982ed431baad7dc7b9389bb5c817f0f8746929cdc9b6a340087a76576ac6c9a3ca9b6b8d78800962afb59dbc9dcac6c78114502eed23344a774b48bc328902b3",
//     "__v": 0
//   }