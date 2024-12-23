const Company = require("../schema/model/companySchema.js");

const indexRoute = async (req, res) => {
    let companies = await Company.find({}).populate('offers');
    res.status(200).json({ companies });
};

const newRoute = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Logo file is required" });
    }

    let companyData = req.body;
    let existingCompany = await Company.findOne({ name: companyData.CompanyName });
    if (existingCompany) {
        return res.status(400).json({ message: "Company already exists" });
    }

    const newCompany = new Company({
        name: companyData.CompanyName,
        logo: {
            link: req.file.path, // Cloudinary URL
            file_name: req.file.filename
        },
        link: companyData.Link,
        desc: companyData.Description,
        contact_no: {
            country_code: "+91",
            number: companyData.Contact
        },
        address: companyData.Address,
    });

    await newCompany.save();
    res.status(201).json({ message: "New company saved" });
};

const showRoute = async (req, res, next) => {
    let { id } = req.params;
    let company = await Company.findById(id).populate('offers');
    if (!company) {
        return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
};

const updateRoute = async (req, res) => {
    let { id } = req.params;
    let updateData = req.body;

    let company = await Company.findById(id);
    if (!company) {
        return res.status(404).json({ message: "Company not found" });
    }

    // Make sure to only update fields provided
    let updatedCompany = await Company.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    res.status(200).json({ message: "Company updated successfully", updatedCompany });
};

const deleteRoute = async (req, res) => {
    let { id } = req.params;
    let deletedCompany = await Company.findByIdAndDelete(id);
    if (!deletedCompany) {
        return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ message: "Company deleted successfully" });
};

module.exports = {indexRoute , newRoute, showRoute ,updateRoute , deleteRoute}