//const {connection} = require("../database/connection");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const pool = require("../database/database");
//console.log(user)
/*
  pool.query('SELECT * FROM `STUDENTS`', function (error, results, fields) {
    console.log(results);
  }); */
//let d = data();
//console.log(d);
exports.viewAllStudents = async (req, res) => {
  pool.query('SELECT * FROM `STUDENTS`',  (error, results, fields) =>{
        const students = results.map(student =>{
          return {
            id: student.s_id,
            name: student.s_name,
            email: student.s_email,
            gender: student.s_gender,
            departmentId: student.DepartmentId,
            semster: student.sem,
            year: student.year
          };
        });
        //res.json({ students });
        //console.log(typeof students);
        
        //const result = JSON.stringify(students);
        res.status(200).json({
          success:true,
          students
        });
        
  });
};

exports.userRegister = async (req, res) => {
  const password = req.body.password;    
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  let user = {
    "username": req.body.userName,
    "email":req.body.email,
    "password": encryptedPassword,
  }

  pool.query('INSERT INTO ADMIN_USERS SET ?', user, function (error, results, fields) {
          
    if (error) {
      return res.status(400).json({
        failed:"error occurred",
        error
      });
    } 
    else {
      return res.status(200).json({
        success:true,
        message:"user registered sucessfully"  
      });
    }    
  });  
}

exports.login = async (req, res) =>{
  const { email, password } = req.body;


  // check for presence of email and password
  if (!email || !password) {
    return res.status(400).json({
      message: "please provide email and password"
    });
  }
  pool.query('SELECT * FROM `ADMIN_USERS` WHERE email = ?', [email], async function(error, results, fields){
    if(error){
      return res.status(400).json({
        message: "error occurred",
        error
      });
    } else {
      if(results.length >0){          
        const comparison = await bcrypt.compare(password, results[0].password)
        
        if(comparison){
          
          const result = results.map(result => {
            return {username: result.username}

          })
          const user = result[0];
          const token = jwt.sign(
            user,
            process.env.TOKEN_KEY,
            {
              expiresIn: "5h",
            }
          );
          const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }; 
          return res.status(200).cookie('token', token, options).json({
            success: true,
            token,
            user
        })
        } else {
          return res.status(400).json({
            message: "Email and password does not match",
          });
        }
      } else {
        return res.status(206).json({
          message: "Email does not exist",
        });
      }
    }
  });

}

exports.logout = async (req, res) => {
  //clear the cookie
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  //send JSON response for success
  res.status(200).json({
    success: true,
    message: "Logout success",
  });
}
exports.addStudent = async (req, res) => {
  let student = {
    "s_name": req.body.name,
    "s_email": req.body.email,
    "s_gender": req.body.gender,
    "sem": req.body.sem,
    "year": req.body.year,
    "DepartmentId": req.body.DepartmentId
  }

  pool.query('INSERT INTO STUDENTS SET ?', student, function (error, results, fields) {
          
    if (error) {
      return res.status(400).json({
        failed:"error occurred",
        error
      });
    } 
    else {
      return res.status(200).json({
        success:true,
        message:"student registered successfully", 
      });
    }    
  });  
}

exports.addSubject = async (req, res) => {
  let subject = {
    "paper_name": req.body.paper_name,
    "DepartmentId": req.body.DepartmentId,
    "sem": req.body.sem
  }
  pool.query('INSERT INTO SUBJECT SET ?', subject, function (error, results, fields) {
          
    if (error) {
      return res.status(400).json({
        failed:"error occurred",
        error
      });
    } 
    else {
      return res.status(200).json({
        success:true,
        message:"subject registered successfully",
        subject 
      });
    }    
  });
}

exports.addAttendanceTable = async(req, res) => {

  let sem = req.body.sem;
  let departmentId = req.body.departmentId;

  let temp = "ATTENDANCE";
  let table_name = temp.concat("_", departmentId, "_SEM_", sem);

  pool.query('CREATE TABLE ?? (att_id INT PRIMARY KEY AUTO_INCREMENT, att_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, s_id INT NOT NULL, paper_id INT NOT NULL, present INT NOT NULL)', table_name, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        failed:"error occurred",
        error
      });
    } 
    else {
      return res.status(200).json({
        success:true,
        message:"table created sucessfully",
      });
    }    
  });
}

exports.addFaculty = async(req, res) => {
  const password = req.body.password;    
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  let faculty = {
    "f_name": req.body.name,
    "f_email": req.body.email,
    "password": encryptedPassword,
    "DepartmentId": req.body.DepartmentId,
  }
  pool.query('INSERT INTO FACULTY SET ?', faculty, function (error, results, fields) {
    if (error) {
      return res.status(400).json({
        failed:"error occurred",
        error
      });
    } 
    else {
      return res.status(200).json({
        success:true,
        message:"faculty registered successfully"  
      });
    }      
  });
}

exports.viewAllFaculty = async(req, res) => {
  pool.query("SELECT * FROM FACULTY", (error, results, fields) =>{
    const faculties = results.map(faculty =>{
      return{
        name: faculty.f_name,
        email: faculty.f_email,
        departmentId: faculty.DepartmentId,
      };
    });
    res.status(200).json({
      success:true,
      faculties
    });
  })
}

exports.viewAllSubjects = async(req, res) => {
  pool.query("SELECT * FROM `SUBJECT`", (error, results, fields) =>{
    const subjects = results.map(subject =>{
      return{
        id: subject.paper_id,
        name: subject.paper_name,
        departmentId: subject.DepartmentId,
        sem: subject.sem
      }
    });
    res.status(200).json({
      success:true,
      subjects
    });
  })
}
