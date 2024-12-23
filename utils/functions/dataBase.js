const deptCodeMap = {
    "Computer Engineering": "07",
    "Information Technology": "16",
    "Civil Engineering": "06",
    "Mechanical Engineering": "19",
    "Electrical Engineering": "09",
    "Chemical Engineering": "05",
    "Textile Technology": "29",
    "Electronics & Communication Engineering": "11",
    "Instrumentation & Control Engineering": "17"
};

const getDeptCode = (deptName) =>{
    return deptCodeMap[deptName] || ".{2}"; // Return "00" or some default if not found
}
const codeToDeptMap = Object.fromEntries(
    Object.entries(deptCodeMap).map(([name, code]) => [code, name])
);

const getDeptName = (deptCode) => {
    return codeToDeptMap[deptCode] || "Unknown Department"; // Return default if not found
};
module.exports = {getDeptCode , getDeptName};