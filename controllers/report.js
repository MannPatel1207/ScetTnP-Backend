const Offer = require("../schema/model/offerSchema.js");
const Company = require("../schema/model/companySchema.js");
const Student = require("../schema/model/studentSchema.js");

const indexRoute = async (req, res) => {
    
    // Retrieving Data from student
    let filds = req.body;

    // Checking for empty fields
    if (!filds) {
        let err = new Error("Invalid Data");
        err.status = 400;
        throw err;
    }

    // Creating enrollment pattern
    let addYear = (filds.batch - 4).toString().slice(2, 4) || '[0-9][0-9]';
    let dept = filds.dept || '[A-Z][A-Z]';
    let enrollmentPattern = `^ET${addYear}BT${dept}[0-9][0-9][0-9]`;
    let gender = filds.male ? filds.female ? '^.{1}' : 'M' : filds.female ? 'F' : '^.{1}' || '^.{1}';
    
    let matchcriteria = {
        enrollment_no: { $regex: enrollmentPattern },
        gender: { $regex: gender },
    };

    // Adding salary filter
    if (filds.salaryAmount) {
        let salaryOperator = filds.salaryOperator === "<" ? "$lte" : "$gte";
        matchcriteria["selected.salary"] = { [salaryOperator]: filds.salaryAmount };
    }
    // Retrieving all Data  
    let data = await Student.find(matchcriteria).populate('applied').populate('selected');

    // Grouping data by 'applied' attribute
    switch(filds.groupBy){
        case 'dept': data = groupByDept(data);
                            break;
        
        case 'company' : data = data = groupByCompany(data);
                        break;

        case 'salary' :  data = data = groupBySalary(data);
                        break;
    }

    // Sending response
    res.send(data);
};


const groupByCompany = (data) => {
    let key = 'applied'
    return data.reduce((result, currentValue) => {
        // Check if the current value has the specified key
        if (currentValue[key]) {
            console.log(currentValue[key]);
            currentValue[key].forEach(groupKey => {
                // Initialize the group if it doesn't exist
                if (!result[groupKey.company]) {
                    result[groupKey.company] = [];
                }
                
                // Add the current item to the group
                result[groupKey.company].push(currentValue);
            });
        } 
        
        return result;
    }, {});
}

const groupBySalary =(data) => {
    let key = 'salary'
    return data.reduce((result, currentValue) => {
        // Check if the current value has the specified key
        if (currentValue.selected) {
                let groupKey = currentValue.selected[key];
                // Initialize the group if it doesn't exist
                if (!result[groupKey]) {
                    result[groupKey] = [];
                }
                
                // Add the current item to the group
                result[groupKey].push(currentValue);
            
        }
        
        return result;
    }, {});
}

const groupByDept = (data) => {
    return data.reduce((result, currentValue) => {
        // Check if the current value has the specified key
                let groupKey = currentValue.enrollment_no.slice(6,8);
                // Initialize the group if it doesn't exist
                if (!result[groupKey]) {
                    result[groupKey] = [];
                }
                
                // Add the current item to the group
                result[groupKey].push(currentValue);
        
        return result;
    }, {});
}

module.exports = {indexRoute};