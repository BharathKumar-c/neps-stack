const project = require('../db/models/project');
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

module.exports = {createProject};
