const User = require('../models/userModels');
const ErrorResponse= require('../utils/errorResponse');


//load all users
// controllers/userController.js

exports.allUsers = async (req, res, next) => {
    const pageSize = parseInt(req.query.pageSize, 10) || 10; // Default to 10 if pageSize is not provided
    const page = parseInt(req.query.pageNumber, 10) || 1; // Default to 1 if pageNumber is not provided

    try {
        const count = await User.countDocuments(); // Total number of documents

        const users = await User.find()
            .sort({ createdAt: -1 })
            .select('-password') // Exclude password field
            .skip(pageSize * (page - 1))
            .limit(pageSize); // Limit results to the current page

        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageSize), // Total number of pages
            count
        });
    } catch (error) {
        next(error);
    }
};

// show single user
exports.singleUser = async (req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            user
        })
        next();

    } catch (error) {
        return next(error);
    } 
}
exports.editUser = async (req,res,next)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json({
            success: true,
            user
        })
        next();

    } catch (error) {
        return next(error);
    } 
}
exports.deleteUser = async (req,res,next)=>{
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message : "user deleted"
        })
        next();

    } catch (error) {
        return next(error);
    } 
}
exports.createUserJobsHistory = async (req, res, next) => {
    const { title, description, salary, location, status = 'pending' } = req.body;

    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        if (!currentUser) {
            return next(new ErrorResponse("You must log in", 401));
        } else {
            const addJobHistory = {
                title,
                description,
                salary,
                location,
                status, // Add the status field
                user: req.user._id
            }
            currentUser.jobsHistory.push(addJobHistory);
            await currentUser.save();
        }

        res.status(200).json({
            success: true,
            currentUser
        });
        next();

    } catch (error) {
        return next(error);
    }
}
exports.updateUserJobStatus = async (req, res, next) => {
    try {
        const { userId, jobId } = req.params;
        const { status } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return next(new ErrorResponse("User not found", 404));
        }

        // Find the specific job history entry by its ID
        const jobHistory = user.jobsHistory.id(jobId);
        if (!jobHistory) {
            return next(new ErrorResponse("Job history not found", 404));
        }

        // Update the status
        jobHistory.status = status;

        // Save the updated user document
        await user.save();

        res.status(200).json({
            success: true,
            message: `Job status updated to ${status}`,
            jobHistory
        });
    } catch (error) {
        return next(error);
    }
};
