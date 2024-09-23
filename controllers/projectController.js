const project = require('../db/models/project');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const createProject = catchAsync(async (req, res, next) => {
  const authUserId = req.user.id;
  const {
    title,
    isFeatured,
    productImage,
    price,
    shortDescription,
    description,
    productUrl,
    category,
    tags,
  } = req.body;

  const newProject = await project.create({
    title,
    isFeatured,
    productImage,
    price,
    shortDescription,
    description,
    productUrl,
    category,
    tags,
    createdBy: authUserId,
  });

  return res.status(201).json({
    status: 'success',
    data: newProject,
  });
});

const getAllProject = catchAsync(async (req, res, next) => {
  const projects = await project.findAll();
  if (!projects) {
    return next(new AppError('Project not yet created', 400));
  }
  return res.status(200).json({
    status: 'success',
    data: projects,
  });
});

module.exports = {createProject, getAllProject};
