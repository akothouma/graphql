import { Endpoints } from "./constants.js"
export const queryApi=async()=>{
    try{
        const jwt=localStorage.getItem()
        const response= await fetch(Endpoints.GRAPHQL_ENPOINT,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${jwt} `
        },
        body:JSON.stringify({
          query:`{
  user {
    id
    firstName
    lastName
    login
    email
    campus
    country:attrs(path:"country")
    gender:attrs(path:"gender")
    createdAt
    auditRatio
    modulexps:xps(where: {originEventId: {_eq: 75}}) {
      path
      amount
    }
    piscineGOxps:xps(where:{originEventId:{_eq:5}}){
      path
      amount
    }
    piscineJSxps:xps(where:{originEventId:{_eq:122}}){
      path
      amount
   
    }
      piscineUXxps:xps(where:{originEventId:{_eq:179}}){
      path
      amount
     
    }
      piscineUIxps:xps(where:{originEventId:{_eq:193}}){
      path
      amount 
    } 

  xp:transactions_aggregate(where:{type:{_eq:"xp"} eventId:{_eq:75}}){
  aggregate{
      sum{
          amount
        }
      }
    }
     auditsDone:transactions_aggregate(where:{type:{_eq:"up"}}){
      aggregate{
        count
      }
    }
      auditsReceived:transactions_aggregate(where:{type:{_eq:"down"}}){
      aggregate{
        count
      }
    }
    modulegrades:progresses_aggregate(where:{eventId:{_eq:75}}){
      aggregate{
        sum{
          grade
        }
      }
    }
    piscineGOgrades:progresses_aggregate(where:{eventId:{_eq:75}}){
      aggregate{
        sum{
          grade
        }
      }
    }
    piscineJSgrades:progresses_aggregate(where:{eventId:{_eq:122}}){
      aggregate{
        sum{
          grade
        }
      }
    }
    piscineUXgrades:progresses_aggregate(where:{eventId:{_eq:179}}){
      aggregate{
        sum{
          grade
        }
      }
    }
    piscineUIgrades:progresses_aggregate(where:{eventId:{_eq:193}}){
      aggregate{
        sum{
          grade
        }
      }
    }
  }   
 transaction(where:{originEventId:{_eq:75} type:{_eq:"xp"}}){
  progress{
  grade
  createdAt
  updatedAt
  } 
}
}
`
        })
       })
    }
    catch(error){

    }

}