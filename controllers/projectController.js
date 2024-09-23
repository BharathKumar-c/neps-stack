const project = require('../db/models/project');
const user = require('../db/models/user');
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
  const projects = await project.findAll({include: user});
  if (!projects) {
    return next(new AppError('Project not yet created', 400));
  }
  return res.status(200).json({
    status: 'success',
    data: projects,
  });
});

const getProjectById = catchAsync(async (req, res, next) => {
  const projectId = req.params.id;
  const result = await project.findByPk(projectId, {include: user});

  if (!result) {
    return next(new AppError('invalid project id', 400));
  }

  return res.status(200).json({
    status: 'success',
    data: result,
  });
});

const updateProject = catchAsync(async (req, res, next) => {
  const projectId = req.params.id;
  const userId = req.user.id;
  const {
    title,
    productImage,
    price,
    shortDescription,
    description,
    productUrl,
    category,
    tags,
  } = req.body;

  const result = await project.findOne({
    where: {id: projectId, createdBy: userId},
  });
  if (!result) {
    return next(new AppError('Invalid project id', 400));
  }

  result.title = title;
  result.productImage = productImage;
  result.price = price;
  result.shortDescription = shortDescription;
  result.description = description;
  result.productUrl = productUrl;
  result.category = category;
  result.tags = tags;
  result.createdBy = userId;

  const updateResult = await result.save();

  return res.json({
    status: 'success',
    data: updateResult,
  });
});

const deleteProject = catchAsync(async (req, res, next) => {
  const projectId = req.params.id;
  const userId = req.user.id;

  await project.destroy({
    where: {id: projectId, createdBy: userId},
  });

  return res.json({
    status: 'success',
    message: 'Record deleted successfully',
  });
});

module.exports = {
  createProject,
  getAllProject,
  getProjectById,
  updateProject,
  deleteProject,
};
