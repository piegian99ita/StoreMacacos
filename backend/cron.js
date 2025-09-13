const cron= require('cron');

const backendURL="https://storemacacos.onrender.com";
const job= new cron.CronJob('*/14 0-2,7-23 * * *',function(){
    console.log('Restarting server');

    fetch(backendURL)
        .then(response=>{
            if(response.ok){
                console.log('Ping successful! Status: ' + response.status);
            }else{
                console.log('Ping fail! Status: ' + response.status);
            }
        })
        .catch(error=> {
            console.error('Ping failed',error.message);
        })
})
console.log('Cron job for pinging the server scheduled. The server is now running.');

module.exports ={
    job,
};