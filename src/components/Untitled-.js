// // console.log(req.body)
//     // Lets validate the data before creating a user
//     const {error} = registerValidation(req.body)
//      if(error) return res.status(400).send(error.details[0].message);
// // console.log('test')
//      //checking if the user is already in the database
//      const emailExist = await User.findOne({email: req.body.email});
//      if(emailExist) return res.status(400).send('Email already exists');

//      //Hash the password
//      const salt = await bcrypt.genSalt(10);
//      const hashedPassword = await bcrypt.hash(req.body.password, salt);


//     //Create a new user
//     const user = new User ({
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword
   
// });
// try{
//     const savedUser = await user.save();
//     res.send({ user: user._id });
// }catch(err){
//     res.status(400).send(err);
// }
// });

// Admin.find({email: req.body.email})
//     .then(admin => {
//         if (admin.length >= 1) {
//         return res.status(400).json('Erorr email already exists.')
//         } else { 
//             bcrypt.hash(req.body.password, 10, (err, hash) => {
//                  if (err) {
//                  return res.status(400).json('Erorr is:' + err)
//                  } else {
//                      // creating a user-admin 
//                      const theNewAdmin = new Admin({
//                        instiutionName: req.body.instiutionName,
//                        adminName: req.body.adminName,
//                        email: req.body.email,
//                        password: hash,
//                        systemUsers: req.body.systemUsers
//                     });
//                      // saving user-admin to the database
//                  theNewAdmin.save()
//                  .then(() => res.json('New admin is create successfully'))
//                  .catch(err => res.status(400).json('Erorr is:' + err))
//                  }
//          });
//         }
//     });