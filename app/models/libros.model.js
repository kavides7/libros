
module.exports = (sequelize, Sequelize) => {
	const libros = sequelize.define('libros', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  codigolibro: {
			type: Sequelize.STRING
	  },
	  nombrelibro: {
			type: Sequelize.STRING
  	},
	 editorial: {
			type: Sequelize.STRING
	  },
	  autor: {
			type: Sequelize.INTEGER

    },codigolibro: {
			type: Sequelize.STRING
	  },
      genero: {
             type: Sequelize.STRING
     },

     paisautor: {
             type: Sequelize.STRING
    },
    nopaginas: {
        type: Sequelize.STRING

    },yearedicion: {
        type: Sequelize.STRING
    },

    precio: {
        type: Sequelize.STRING
    },
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
        }
    
	});
	
	return libros;
}