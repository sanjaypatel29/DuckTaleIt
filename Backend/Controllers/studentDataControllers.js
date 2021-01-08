const { studentValidator } = require("../Validation/validation")
const StudentData = require("../Models/studentData")
const studentData = require("../Models/studentData");

const postStudentData = async (req, res) => {
    try {
        const { error } = studentValidator(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const { id } = req.body;
        const idExists = await StudentData.findOne({ id });


        if (idExists) {
            throw new Error('id already exists');
        }

        const student = await new StudentData({
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            stuClass: req.body.stuClass,
            subject: req.body.subject
        });

        await student.save();
        res.send(student);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

const getAllStudents = async (req, res, next) => {
    let { id, stuClass, subName } = req.query;

    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    let sortByid = id === 'asc' ? 1 : id === 'desc' ? -1 : 0;
    if (stuClass !== undefined && subName === undefined) {
        const studentDatas = await studentData.countDocuments(
            {
                stuClass: { $regex: stuClass }
            },
            (err) => {
                if (err) console.log(err);
            }
        );
        const finalPage = Math.ceil(studentDatas / limit);
        try {
            const results = await studentData.find({
                stuClass: { $regex: stuClass }
            })
                .sort({ id: sortByid })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    } else if (stuClass === undefined && subName !== undefined) {
        const studentDatas = await studentData.countDocuments(
            {
                subName: { $regex: subName }
            },
            (err) => {
                if (err) console.log(err);
            }
        );
        const finalPage = Math.ceil(studentDatas / limit);
        try {
            const results = await studentData.find({
                subName: { $regex: subName }
            })
                .sort({ id: sortByid })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    } else if (subName !== undefined && stuClass !== undefined) {
        const studentDatas = await studentData.countDocuments(
            {
                subName: { $regex: subName },
                stuClass: { $regex: stuClass }
            },
            (err) => {
                if (err) console.log(err);
            }
        );
        const finalPage = Math.ceil(studentDatas / limit);
        try {
            const results = await studentData.find({
                subName: { $regex: subName },
                stuClass: { $regex: stuClass }
            })
                .sort({ id: sortByid })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    } else {
        const studentDatas = await studentData.countDocuments({}, (err) => {
            if (err) console.log(err);
        });
        const finalPage = Math.ceil(studentDatas / limit);
        try {
            const results = await studentData.find({}).sort({ id: sortByid }).skip((page - 1) * limit).limit(limit);
            return res.status(200).send({ data: results, currentpage: page, finalPage });
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }
    }
};
const studentDataId = (req, res) => {
    console.log(req.query.id);
    StudentData.findById(req.query.id)
        .then((studentData) => res.json(studentData))
        .catch((err) => res.status(400).json('Error' + err));
};

const getstudentSearch = async (req, res) => {
    try {
        await studentData.find({
            firstName: {
                $regex: req.query.firstName,
                $options: "i"
            },
        }, function (err, data) {
            res.send(data)
        })
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

const editstudent = async (req, res) => {
    StudentData.findById(req.params.id)
        .then(item => {
            item.firstName = req.body.firstName
            item.lastName = req.body.lastName
            item.stuClass = req.body.stuClass
            item.subject = req.body.subject

            item.save()
                .then(() => res.json("student Data updated Successfully!"))
                .catch(err => res.status(400).json(`Error : ${err}`))
        })
        .catch(err => res.status(400).json(`ERROR : ${err}`))
}

const deletestudent = async (req, res) => {
    StudentData.findByIdAndDelete(req.params.id)
        .then(() => res.json("student Deleted Successfully"))
        .catch((err) => res.status(400).json("Error: " + err));
}


module.exports = { postStudentData, getAllStudents, studentDataId, deletestudent, getstudentSearch, editstudent }