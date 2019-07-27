module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200]
      }
    },
    question1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200]
      }
    },
    question2: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200]
      }
    },
    question3: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200]
      }
    },
    current: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  });
  return Question;
};
