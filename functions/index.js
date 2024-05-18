const functions=require("firebase-functions")
const doc =require("../../Desktop/wakeflow/doc.json")



exports.getDocumentation=functions.https.onRequest((request,response)=>{
    response.send({output:doc})
})
function rankedScore(arr){
    
    let ranked2=arr.sort((a,b)=>b-a)
    let scoreRanks=[]
    for(var i=0;i<ranked2.length;i++){
       scoreRanks[i]=1
    }

     for(var n=0;n<ranked2.length-1;n++){
         if(ranked2[n]===ranked2[n+1]){
           scoreRanks[n+1]=scoreRanks[n]

         }else
         {
             scoreRanks[n+1]=scoreRanks[n]+1

         }
     }        

           
         return scoreRanks

       
    }

exports.climbingLeaderboard=functions.https.onRequest((request,response)=>{
    const {input} = request.body
    const {player,ranked}=input;
        const scoreRanks = rankedScore(ranked);
        const finalScore = [];
        for (let i = 0; i <player.length; i++) {
            let j = 0;
            if (player[i] >= ranked[0]) {
                finalScore.push(1);
                continue;
                
            }
            if (player[i] < ranked[ranked.length - 1]) {
                finalScore.push(scoreRanks[scoreRanks.length - 1] + 1);
                continue;
            }
            while (j < ranked.length) {
                if (player[i] >= ranked[j]) {
                    finalScore.push(scoreRanks[j]);
                    break;
                }
                j++;
            }
        }
    
        response.send( {output:finalScore})})