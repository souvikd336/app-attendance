const pool = require("../database/database");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


exports.login = async (req, res) =>{
  const { email, password } = req.body;


  // check for presence of email and password
  if (!email || !password) {
    return res.status(400).json({
      message: "please provide email and password"
    });
  }
  pool.query('SELECT * FROM `FACULTY` WHERE f_email = ?', [email], async function(error, results, fields){
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
            return {username: result.f_name}

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
    succes: true,
    message: "Logout success",
  });
}
exports.giveAttendance = async (req, res) => {
    let attendance = {
        "s_id": req.body.s_id,
        "paper_id": req.body.paper_id,
        "present": req.body.present
    }
    let sem = req.body.sem;
    let departmentId = req.body.departmentId;

    let temp = "ATTENDANCE";
    let table_name = temp.concat("_", departmentId, "_SEM_", sem);

    pool.query('INSERT INTO ?? SET ?', [table_name,attendance], function (error, results, fields) {  
        if (error) {
          return res.status(400).json({
            failed:"error occurred",
            error
          });
        } 
        else {
          return res.status(200).json({
            success:true,
            message:"attendance marked successfully", 
          });
        }    
      }); 
}

exports.viewAttendanceByTable = async (req, res) => {
    let sem = req.body.sem;
    let departmentId = req.body.departmentId.toUpperCase();

    let temp = "ATTENDANCE";
    let table_name = temp.concat("_", departmentId, "_SEM_", sem);
    pool.query('SELECT * FROM ??', table_name, (error, results, fields) =>{
      const attendance = results.map(Arr =>{
        return {
          att_id: Arr.att_id,
          att_date: Arr.att_date,
          s_id: Arr.s_id,
          paper_id: Arr.paper_id,
          present: Arr.present
        };
      });
      res.status(200).json({
          success:true,
          attendance
        });
})
}
exports.viewStudentsByDepartmentIdAndSem = async (req, res) => {
  let sem = req.body.sem;
  let departmentId = req.body.departmentId.toUpperCase();

  pool.query('SELECT s_id, s_name FROM STUDENTS WHERE sem = ? AND DepartmentId = ?', [sem, departmentId], (error, results, fields) =>{
    const student = results.map(Arr =>{
      return {
        s_id: Arr.s_id,
        s_name: Arr.s_name
      };
    });
    res.status(200).json({
        success:true,
        students
      });
})
}

exports.viewnext = async (req, res) => {
  const { semester, departmentId } = req.query;
  pool.query('SELECT s_id, s_name FROM STUDENTS WHERE sem = ? AND DepartmentId = ?', [semester, departmentId], (error, results) => {
    
    const students = results.map(Arr =>{
      return {
        s_id: Arr.s_id,
        s_name: Arr.s_name
      };
    });
    res.status(200).json({
        success:true,
        students
      });
});
}

exports.viewPaperId = async (req, res) => {
  const { departmentId, semester } = req.query;
      pool.query('SELECT paper_id, paper_name FROM SUBJECT WHERE DepartmentId = ? AND sem = ?', [departmentId, semester], (error, results) => {
        /*
        const papers = results.map(Arr =>{
          return {
            paper_id: Arr.paper_id,
            paper_name: Arr.paper_name
          }
        });
        res.status(200).json({
          success:true,
          papers
        });
      }); 
    }*/
        if (error) {
          return res.status(500).json({
            success: false, message: 'Error fetching papers', error
          });
        }else {
          const papers = results.map(Arr =>{
            return {
              paper_id: Arr.paper_id,
              paper_name: Arr.paper_name
            }
          });
          res.status(200).json({
            success:true,
            papers
          });
        }
      });
    }
  