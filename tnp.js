
    const {Gtu_student} = require('./schema/model/studentSchema.js');
    const Company = require('./schema/model/companySchema.js');
    const Offer = require('./schema/model/offerSchema.js');
    const mongoose = require('mongoose')
    const {} = require('./')
    
    let getData =async ()=> {
        let data = { 20 : { l1 : 0, l2 : 0, l3 : 0 , l5 : 0 , l10 : 0 , l20 : 0},19 : { l1 : 0, l2 : 0, l3 : 0 , l5 : 0 , l10 : 0 , l20 : 0} ,18 : { l1 : 0, l2 : 0, l3 : 0 , l5 : 0 , l10 : 0 , l20 : 0} , 17 : { l1 : 0, l2 : 0, l3 : 0 , l5 : 0 , l10 : 0 , l20 : 0}}
        // let data = { 20 : { l1 : [], l2 : [], l3 : [] , l5 : [] , l10 : [] , l20 : []},19 : { l1 : [], l2 : [], l3 : [] , l5 : [] , l10 : [] , l20 : []} ,18 : { l1 : [], l2 : [], l3 : [] , l5 : [] , l10 : [] , l20 : []} , 17 : { l1 : [], l2 : [], l3 : [] , l5 : [] , l10 : [] , l20 : []}}
        
        let students = [];
 
    
        // Find offers where the company field matches any of the given ObjectIds
        let offers = await Offer.find({}).populate('applicants').populate('company');
        for(let offer of offers){
            students.push(...offer.applicants);
        }
    
        for (let student of students) {
            if(student.selected){
            let addYear = student.enrollment_no.slice(0,2);
    
            if(addYear === '19' || addYear === '18' || addYear === '17' || addYear === '20'){
            //     console.log(student)
            // console.log(addYear)
    
            if (100000 <= student.selected.salary && student.selected.salary < 200000) {
                // data[addYear].l1.push(student.enrollment_no);
                // console.log(`${addYear} = ${student.selected.salary} -> ${student.enrollment_no}`);
                data[addYear].l1 += 1;
            } else if (200000 <= student.selected.salary && student.selected.salary < 300000) {
                // console.log(`${addYear} = ${student.selected.salary} -> ${student.enrollment_no}`);
                data[addYear].l2 += 1;
                // data[addYear].l2.push(student.enrollment_no);

            } else if (300000 <= student.selected.salary && student.selected.salary < 500000) {
                // console.log(`${addYear} = ${student.selected.salary} -> ${student.enrollment_no}`);
                data[addYear].l3 += 1;
                // data[addYear].l3.push(student.enrollment_no);

            } else if (500000 <= student.selected.salary && student.selected.salary < 1000000) {
                // console.log(`${addYear} = ${student.selected.salary} -> ${student.enrollment_no}`);
                data[addYear].l5 += 1;
                // data[addYear].l5.push(student.enrollment_no);

            }
            else if (1000000 <= student.selected.salary && student.selected.salary < 2000000) {
                // console.log(`${addYear} = ${student.selected.salary} -> ${student.enrollment_no}`);
                data[addYear].l10 += 1;
                // data[addYear].l10.push(student.enrollment_no);

            }
            else if (200000 <= student.selected.salary) {
                // console.log(`${addYear} = ${student.selected.salary} -> ${student.enrollment_no}`);
                data[addYear].l20 += 1;
                // data[addYear].l20.push(student.enrollment_no);

            }
        }}
    }
    
        console.log(data);
    }
    async function main(){
        await mongoose.connect("mongodb+srv://krishpatel-3011:uz6pGaPneq1LJjv2@cluster0.ife8a3d.mongodb.net/scetTnP");
        let students = getData();
        
    
    }
    main().then(console.log("Database connected")).catch(err => {console.log(`error in connecting database : ${err}`)});