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
            user: req.user.id
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
        // Destructuring query parameters from the request
        const { pageNumber = 1, pageSize = 5, keyword = '', cat, location } = req.query;

        // Search filter for job title using keyword if provided
        const keywordFilter = keyword
            ? { title: { $regex: keyword, $options: 'i' } }
            : {};

        // If category (job type) is provided, filter by it; otherwise, select all categories
        const categoryFilter = cat
            ? { jobType: cat }
            : { jobType: { $in: (await JobType.find({}, { _id: 1 })).map(jobType => jobType._id) } };

        // Getting all unique locations, use provided location(s) if available, otherwise use all available
        const allLocations = (await Job.find({}, { location: 1 })).map(job => job.location);
        const locationFilter = location
            ? { location }
            : { location: { $in: allLocations } };

        // Converting pageSize and pageNumber into integers
        const page = parseInt(pageNumber, 10) || 1;
        const limit = parseInt(pageSize, 10) || 5;
        const skip = limit * (page - 1);

        // Building the query object with keyword, category, and location filters
        const query = {
            ...keywordFilter,
            ...categoryFilter,
            ...locationFilter
        };

        // Counting the total number of matching jobs
        const count = await Job.countDocuments(query);

        // Fetching jobs with pagination, sorting, and population of references
        const jobs = await Job.find(query)
            .sort({ createdAt: -1 })
            .populate('jobType', 'jobTypeName')
            .populate('User', 'firstName')
            .skip(skip)
            .limit(limit);

        // Sending back the response with jobs, pagination info, and available locations
        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / limit),
            count,
            setUniqueLocation: allLocations // Returning all unique locations
        });
    } catch (error) {
        next(error);
    }
};
