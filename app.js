const Neode = require("neode");
const instance = Neode.fromEnv().with({
  Person: require('./person.model')
});
instance.setEnterprise(true);
const request = require('request')
const relations = ["FOLLOW", "HELPERS"];
const userIds = ["1237", "1239", "1243", "1235", "1245", "1244", "1242", "1236", "manish123", "1241", "1238", "1240", "103", "111"];
  userIds.map(async (id) => {
   await instance.merge('Person', { id: id });
    for(let i = 0; i < userIds.length; i++){
      if(id !== userIds[i]){
        let body = {
          from: id,
          to: userIds[i]
        };
        relations.map(async (relation) => {
          console.log(relation)
         request.post('http://localhost:4000/api/user/relation/'+relation, {
           json: {
            data: body
            }
          }, (error, res, body) => {
            if (error) {
              // console.log(error)
              return error
            }
            // console.log(`statusCode: ${res.statusCode}`)
            // console.log(body)
            return body
          })
        })
      //   relations.map(async (relation) => {
      //   let relationresult = await instance.cypher("MATCH p=(v:Person {id:$body.from})-[r:" + relation + "]->(x:Person {id:$body.to}) RETURN p", { body: body });
      //     if(relationresult.records.length == 0){
      //     let createdRelation = await instance.cypher("MATCH (a:Person),(b:Person) WHERE a.id = $body.from AND b.id = $body.to CREATE (a)-[r:" + relation + "]->(b) RETURN r", { body: body });
      //     return {
      //       from: body.from,
      //       to: body.to,
      //       relation: createdRelation.records[0]._fields[0].type,
      //       success: true
      //     };
      //   }else{
      //     return {
      //       message: 'already following'
      //     };
      //   }
      // })
    }
  }
  });
