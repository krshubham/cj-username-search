const axios = require('axios');
const atob = require('atob');
const btoa = require('btoa');
(async () => {
    try{
        function carryOn(arr){
            for(i of arr){
                for(j of i){
                    if(j.displayname === 'gvaibhav21'){
                        console.log(j);
                        return;
                    }
                }
            }
        }
        /**
         * data --->
         * challenge
         * full_scoreboard_size
         * user_scores
         */
        let initRank = 1;
        count = 1;
        let scoresArray = [];
        let interval_id = setInterval(async () => {
            if(count > 6){
                clearInterval(interval_id);
                carryOn(scoresArray);
                return;
            }
            const request_object = {
                min_rank: initRank,
                num_consecutive_users: 200
            };
            console.log(request_object);
            let data = (await axios.get(`https://codejam.googleapis.com/scoreboard/0000000000007706/poll?p=${btoa(JSON.stringify(request_object))}`)).data;
            data = atob(data);
            data = JSON.parse(data);
            // console.log(data.user_scores);
            scoresArray.push(data.user_scores);
            count++;
            initRank += 200;
        }, 2000);
    }
    catch(err){
        console.log(err);
    }

})();
