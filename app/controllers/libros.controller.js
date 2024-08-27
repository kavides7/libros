

const db = require('../config/db.config.js');
const libros = db.libros;

exports.create = (req, res) => {
    let libros = {};

    try{
        // Building libros object from upoading request's body
        libros.codigolibro = req.body.codigolibro;
        libros.nombrelibro = req.body.nombrelibro; 
        libros.editorial = req.body.editorial;  
        libros.autor = req.body.autor;  
        libros.genero = req.body.genero;  
        libros.paisautor = req.body.paisautor;  
        libros.nopaginas = req.body.nopaginas.replace; 
        libros.yearedicion = req.body.yearedicion; 
        libros.precio = req.body.precio;  
        
    
        // Save to MySQL database
        libros.create(libros).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a libros with id = " + result.id,
                libros: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAlllibross = (req, res) => {
    // find all libros information from 
    libros.findAll()
        .then(librosInfos => {
            res.status(200).json({
                message: "Get all libros' Infos Successfully!",
                libross: librosInfos
            });
        })
        . catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

exports.getlibrosById = (req, res) => {
  // find all libros information from 
  let librosId = req.params.id;
  libros.findByPk(librosId)
      .then(libros => {
          res.status(200).json({
              message: " Successfully Get a libros with id = " + librosId,
              libross: libros
          });
      })
      . catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
      });
}


exports.filteringByAge = (req, res) => {
  let age = req.query.age;

    libros.findAll({
                      attributes: ['id', 'codigolibro', 'nombrelibro', 'editorial', 'autor','genero','paisautor','nopaginas','paisautor','yearedicion','precio', 'copyrightby'],
                      where: {age: age}
                    })
          .then(results => {
            res.status(200).json({
                message: "Get all libros with age = " + age,
                libros: results,
            });
          })
          . catch(error => {
              console.log(error);
              res.status(500).json({
                message: "Error!",
                error: error
              });
            });
}
 
exports.pagination = (req, res) => {
  try{
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
  
    const offset = page ? page * limit : 0;
  
    libros.findAndCountAll({ limit: limit, offset:offset })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
          message: "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
          data: {
              "copyrightby": "UMG ANTIGUA",
              "totalItems": data.count,
              "totalPages": totalPages,
              "limit": limit,
              "currentPageNumber": page + 1,
              "currentPageSize": data.rows.length,
              "libros": data.rows
          }
        };
        res.send(response);
      });  
  }catch(error) {
    res.status(500).send({
      message: "Error -> Can NOT complete a paging request!",
      error: error.message,
    });
  }    
}

exports.pagingfilteringsorting = (req, res) => {
  try{
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let age = parseInt(req.query.age);
  
    const offset = page ? page * limit : 0;

    console.log("offset = " + offset);
  
    libros.findAndCountAll({
                                attributes: ['id', 'codigolibro', 'nombrelibro', 'editorial', 'autor','genero','paisautor','nopaginas','paisautor','yearedicion','precio'],
                                where: {age: age}, 
                                order: [
                                  ['codigolibro', 'ASC'],
                                  ['nombrelibro', 'DESC']
                                ],
                                limit: limit, 
                                offset:offset 
                              })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
          message: "Pagination Filtering Sorting request is completed! Query parameters: page = " + page + ", limit = " + limit + ", age = " + age,
          data: {
              "copyrightby": "UmgAntigua",
              "totalItems": data.count,
              "totalPages": totalPages,
              "limit": limit,
              "age-filtering": age,
              "currentPageNumber": page + 1,
              "currentPageSize": data.rows.length,
              "libros": data.rows
          }
        };
        res.send(response);
      });  
  }catch(error) {
    res.status(500).send({
      message: "Error -> Can NOT complete a paging request!",
      error: error.message,
    });
  }      
}

exports.updateById = async (req, res) => {
    try{
        let librosId = req.params.id;
        let libros = await libros.findByPk(librosId);
    
        if(!libros){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a libros with id = " + librosId,
                libros: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                firstname: req.body.firstname,
                codigolibro: req.body.codigolibro,
                nombrelibro: req.body.nombrelibro,
                editorial: req.body.editorial,
                autor: req.body.autor,
                genero: req.body.genero,
                paisautor: req.body.paisautor,
                nopaginas: req.body.nopaginas,
                yearedicion: req.body.yeared,
                precio: req.body.precio,
            }
            let result = await libros.update(updatedObject, {returning: true, where: {id: librosId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a libros with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a libros with id = " + librosId,
                libros: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a libros with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let librosId = req.params.id;
        let libros = await libros.findByPk(librosId);

        if(!libros){
            res.status(404).json({
                message: "Does Not exist a libros with id = " + librosId,
                error: "404",
            });
        } else {
            await libros.destroy();
            res.status(200).json({
                message: "Delete Successfully a libros with id = " + librosId,
                libros: libros,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a libros with id = " + req.params.id,
            error: error.message,
        });
    }
}