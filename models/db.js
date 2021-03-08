const con = require('../config/mysql')

function model(){} ;
model.prototype = {
    /* load : function(sql){
       
         return new Promise(function(resolve,reject){
             pool.query(sql,function (err,result,fields){ 
                 if(err){
                     return reject(err);
                 }
                 resolve(result);
         });
          })
     },
     /* load : function(sql,fun_done,fun_fail){
         pool.query(sql,function (err,result,fields){ 
             if(err){
                 return fun_fail(err);
             }
           fun_done(result);
          })
     } */
 
     /*create: function(table,entity){
         return new Promise(function(resolve,reject){
             const sql =`insert into ${table} set?`
             pool.query(sql,entity,function (err,result){ 
                 if(err){
                     return reject(err);
                 }
                 resolve(result);
         });
          })
     },*/
     
     checkLogin: function(entity,callback){
         const sql=`select user_id from user_account where user_name= '${entity.username}' and user_password= '${entity.password}'` ;
         con.query(sql,function (err, result, fields) {
             if (err) throw err;
             //check exist data
             if(result.length >0){
                 /* console.log(result[0]); = RowDataPacket { user_id: 1 }*/
                 callback(result[0].user_id); 
           }else{
               callback(null); 
           }
          });
     }, 
     register: function (entity,callback){
             const sql_addNewAccount=`insert into user_account(user_name,user_password,phone_numbers,email) values('${entity.username}','${entity.password}','${entity.phonenumbers}','${entity.email}')`;
             con.query(sql_addNewAccount,function(err,result){
                 if(err) throw err;
                /*  console.log(result.insertId) */
                const sql_setRole =`INSERT INTO user_role (user_id,role_id) VALUES(${result.insertId}, ${entity.role})`;
                con.query(sql_setRole)
                callback(result.insertId,entity.role);
                console.log('add thanh cong')
             })

         
       },
     checkExist:  function (entity,callback) {
             const sql=`select user_id from user_account where user_name= '${entity.username}'` ;
             con.query(sql,function (err, result, fields) {
                 if (err) throw err;
                 //check exist data
                 if(result.length ==0){
                     callback(entity); 
               }else{
                   callback(null); 
               }
              });/* 
 
             this.addNewUserAccount(entity) */
         },
      checkRole: function(user_id,callback){
            const sql = `select role_id from user_role where user_id= '${user_id}'`;
            con.query(sql,function(err,result,fields){
                if(err) throw err;
                callback(result);
            })

      },
    
     showListAccount: function(callback){
         const sql='select * from user_account';
         con.query(sql,function (err,result,fields) {
             if(err) throw err;
             callback(result)
           })
     },
     deleteUserAccount: function(user_id,callback){
         const sql=`delete from user_account where user_id=${user_id}`;
         con.query(sql,function(err,result,fields){
             if(err) throw err;
             callback(result);
         })
     }/* ,
     addNewCvRTemplate: function (entity,callback) {
         const sql=`insert into user_account(user_name,user_password,phone_numbers,email,permission,fullname_user) values('${entity.username}','${entity.password}','${entity.phonenumbers}','${entity.email}','0','${entity.fullname}')`
         
         const sql=`insert into cv_template(location,user_password,phone_numbers,email,permission,fullname_user) values('${entity.username}','${entity.password}','${entity.phonenumbers}','${entity.email}','0','${entity.fullname}')`
 
       }  */
    
 };
 module.exports =  model;