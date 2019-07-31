module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    country1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200]
      }
    },
    country2: {
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
  Question.associate = function(models) {
    models.Question.hasMany(models.Answer, {
      onDelete: "CASCADE"
    })
  }
  return Question;
};
