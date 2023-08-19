const mongoose = require('mongoose');

mongoose.model("order", {
  cutsmerId: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
  },
  BookId: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true,
  },
  initialDate: {
    type: Date,
    require: true,
  },
  deliveryDate: {
    type: Date,
    require: true,
  },
});