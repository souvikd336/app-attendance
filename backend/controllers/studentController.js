const pool = require("../database/database");

exports.viewAttendanceById = async (req, res) => {
    let studentId = req.body.s_id;
    let sem = req.body.sem;
    let departmentId = req.body.departmentId;

    let temp = "ATTENDANCE";
    let table_name = temp.concat("_", departmentId, "_SEM_", sem);


    pool.query('SELECT * FROM ?? WHERE s_id=?', [table_name, studentId], (error, results, fields) =>{
        const attendance = results.map(student =>{
          return {
            att_id: student.att_id,
            att_date: student.att_date,
            s_id: student.s_id,
            paper_id: student.paper_id,
            present: student.present
          };
        });
        if (error) {
          return res.status(400).json({
            failed:"error occurred",
            error
          });
        } else {
          if(attendance.length === 0){
            return res.status(404).json({
              success: false,
              message: "No Record Found"
            })
          } else{
            res.status(200).json({
              success:true,
              attendance
            });
          }
        }
        
});
}