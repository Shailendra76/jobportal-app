const Job = require('../models/jobModel');
const JobType = require('../models/jobTypeModel');
const ErrorResponse = require('../utils/errorResponse');

// Create job
exports.createJob = async (req, res, next) => {
    try {
        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            jobType: req.body.jobType,
            user: req.user.id,
            expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
        res.status(201).json({
            success: true,
            job
        });
    } catch (error) {
        next(error);
    }
};

// Get single job by id
exports.singleJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id).populate('jobType', 'jobTypeName');
        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        next(error);
    }
};

// Update job by id
exports.updateJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, { new: true })
            .populate('jobType', 'jobTypeName')
            .populate('User', 'firstName lastName');
        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        next(error);
    }
};

// Delete job by id
exports.deleteJob = async (req, res, next) => {
    try {
        await Job.findByIdAndDelete(req.params.job_id);
        res.status(200).json({
            success: true,
            message: "Job deleted."
        });
    } catch (error) {
        next(error);
    }
};

// Get jobs with filters and pagination
exports.showJobs = async (req, res, next) => {
    try {
        // Enable search
        const keyword = req.query.keyword ? {
            title: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {};

        // Get all category ids
        const categoryIds = (await JobType.find({}, { _id: 1 })).map(cat => cat._id);

        // Filter by category ids
        const categoryId = req.query.cat || categoryIds;

        // Get all locations
        const setUniqueLocation= (await Job.find({}, { location: 1 })).map(val => val.location);
        const filteredLocations = req.query.location && req.query.location !== 'All' ? req.query.location : setUniqueLocation;

        // Enable pagination
        const pageSize = 5;
        const page = Number(req.query.pageNumber) || 1;
        const count = await Job.find({ ...keyword, jobType: categoryId, location: filteredLocations }).countDocuments();

        const jobs = await Job.find({ ...keyword, jobType: categoryId, location: filteredLocations }).sort({ createdAt: -1 }).populate('jobType', 'jobTypeName').populate('User', 'firstName').skip(pageSize * (page - 1)).limit(pageSize);
        const jobTitles = await Job.find({ ...keyword, jobType: categoryId, location: filteredLocations })
        .distinct('title');
        res.status(200).json({
            success: true,
            jobTitles,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            setUniqueLocation
        });
    } catch (error) {
        next(error);
    }
};