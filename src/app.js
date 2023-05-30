const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Image');
    },
    filename: (req,file,cb) => {
        console.log(file)
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

const uplode = multer({storage: storage})


require("./db/conn");

const RegisterUser = require("./models/registers");
const { json } = require("express");
const { log } = require("console");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public" );
const template_path = path.join(__dirname, "../templates/views" );


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);



app.post("/uplode", uplode.single("image"), (req, res) => {
    res.render("instructorlogin");
});


app.get("/", (req, res) => {
    res.render("main")
});

//USER SERVER

app.get("/register", (req, res) => {
    res.render("userregister")
});

app.get("/backuserlogin", (req, res) => {
    res.render("userlogin")
});

app.get("/logini", (req, res) =>{
    res.render("userlogin");
})

app.get("/userlogout", (req, res) => {
    res.render("userlogin");
})

app.get("/userproduct", (req, res) => {
    res.render("userproduct");
})

app.get("/userhome", (req, res) => {
    res.render("userhomepage");
})

app.get("/usernotification", (req, res) => {
    res.render("usernotification");
})

app.get("/userreward", (req, res) => {
    res.render("userreward");
})


app.get("/errorpageloginuser", (req, res) => {
    res.render("userlogin");
})


app.get("/userplayerlink", (req, res) => {
    res.render("userplayer");
})

app.get("/playerback", (req, res) => {
    res.render("userhomepage");
})

app.get("/extraplayer", (req, res) => {
    res.render("extraplayer");
})

app.get("/checkoutuserone", (req, res) => {
    res.render("shopone");
})

app.get("/checkout", (req, res) => {
    res.render("userplayer");
})


app.get("/checkoutextra", (req, res) => {
    res.render("shoptwo");
})

app.get("/checkoutextraone", (req, res) => {
    res.render("extraplayer");
})

app.get("/instructoruplode", (req, res) => {
    res.render("instructoruplode");
})

app.get("/instructormedia", (req, res) => {
    res.render("instructormedia");
})

app.get("/instructorproduct", (req, res) => {
    res.render("instructorproduct");
})

app.get("/instructornotification", (req, res) => {
    res.render("instructornotification");
})

app.get("/instructorlogout", (req, res) => {
    res.render("instructorlogin");
})

// create a new user in our database
app.post("/registeruser", async (req, res) =>{
    try {

      const password = req.body.password;
      const cpassword = req.body.confirmpassword;

      if(password === cpassword){
        
        const registerEmployee = new RegisterUser({
                firstname: req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                age:req.body.age,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword    
        })

        console.log("the success part" + registerEmployee);

        const token = await registerEmployee.generateAuthToken();
        console.log("the token part" + token);

        const registered = await registerEmployee.save();
        console.log("the page part" + registered);

        res.status(201).render("userlogin");

      }else{
          res.render("usererroepage")
      }
        
    } catch (error) {
        res.render("usererroepage")
    }
})


// login check

app.post("/loginuser", async(req, res) =>{
   try {
    
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await RegisterUser.findOne({email:email});

        const isMatch = await bcrypt.compare(password, useremail.password);

        const token = await useremail.generateAuthToken();
        console.log("the token part" + token);
       
        if(isMatch){
            res.status(201).render("userhomepage");
        }else{
            res.render("usererroepage") 
        }
    
   } catch (error) {
       res.render("usererroepage")
   }
})




app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})

//------------------------------------------------------------------ INSTRUCTOR

require("../instructor/db/instructordb");
const RegisterInstructor = require("../instructor/models/instructor");


app.get("/instructor-home-login", (req, res) => {
res.render("instructorlogin")
});

app.get("/instructorregi", (req, res) => {
res.render("instructorregister")
});

app.get("/backinstructor", (req, res) => {
res.render("instructorlogin")
});

app.get("/forgottenuser", (req, res) => {
    res.render("forgotten")
});


app.get("/nothing", (req, res) => {
    res.render("userlogin")
});


app.post("/registerinstructor", async (req, res) =>{
    try {

      const password = req.body.password;
      const cpassword = req.body.confirmpassword;

      if(password === cpassword){
        
          const registerEmployee = new RegisterInstructor({
                firstname: req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                age:req.body.age,
                image:req.body.image,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword    
        })

        console.log("the success part" + registerEmployee);

        const token = await registerEmployee.generateAuthToken();
        console.log("the token part" + token);

        const registered = await registerEmployee.save();
        console.log("the page part" + registered);

          res.status(201).render("certificate");

      }else{
          res.send("password are not matching")
      }
        
    } catch (error) {
        res.status(400).render("instructorerrorpage");
    }
})


app.get("/errorpagelogininstructor", (req, res) => {
    res.render("instructorlogin")
});


app.get("/back", (req, res) => {
    res.render("main")
});



app.post("/logininstructor", async(req, res) =>{
   try {
    
        const email = req.body.email;
        const password = req.body.password;

       const useremail = await RegisterInstructor.findOne({email:email});

        const isMatch = await bcrypt.compare(password, useremail.password);

        const token = await useremail.generateAuthToken();
        console.log("the token part" + token);
       
        if(isMatch){
            res.status(201).render("instructorexplore");
        }else{
            res.status(400).render("instructorerrorpage");
        }
    
   } catch (error) {
       res.status(400).render("instructorerrorpage");
   }
})




app.get("/instructorexplore", (req, res) => {
    res.render("instructorexplore");
})


//  UPLODE VIDEOS
 

require("../src/db/uplodes");
const uplodes = require("../src/models/uplode");

app.post("/video", async(req,res) => {

    try
    {
        const videouplode = new uplodes({
            title: req.body.title,
            description: req.body.description,
            num: req.body.num,
            file: req.body.file,
            price:req.body.price
        })

        console.log("the sucess part" + videouplode);
        const uploded = await videouplode.save();
        console.log("the page part" + uploded);
        res.status(201).render("instructoruplodecorrect");
    } 
    catch (error) {
    res.status(400).send(error);
    console.log("the error part page ");
}
})


app.get("/mypage", (req, res) => {
    res.render("instructoruplode");
})


//