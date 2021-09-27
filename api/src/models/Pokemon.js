const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: { // ID UUIDV4
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },

    name: { // NAME POKE
      type: DataTypes.STRING,
      allowNull: false,
    },

    hp: { // PTS VIDA
    type: DataTypes.INTEGER,
    allowNull: false,
    },

    attack: { //PTS ATAQUE/FUERZA
    type: DataTypes.INTEGER,
    allowNull: false,
    },

    defense: { // PTS DEFENSA
    type: DataTypes.INTEGER,
    allowNull: false,
    },

    speed: { // PTS VELOCIDAD
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    height: { // ALTURA
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    weight: { // PESO
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    image: { //IMAGEN
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  
  {
    timestamps: false,
  });
};
