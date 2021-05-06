import tl = require('azure-pipelines-task-lib/task'); 
import https = require('https'); 

async function run() {
   
    try { 
        var appId: string | undefined = tl.getInput('appId', true);
        var restApiKey: string | undefined = tl.getInput('restApiKey', true);
        var title: string | undefined = tl.getInput('title', true);
        var message: string | undefined = tl.getInput('message', true);
        

        let oneSignalData = {
            app_id: appId,
            included_segments: ["Subscribed Users"],
            title: {"en": title},
            contents: {"en": message},
          }; 
        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Basic ${restApiKey}`
          };
          
          var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
          };
          
          
        var req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`) 
            res.on('data', d => {
                tl.setResult(tl.TaskResult.Succeeded, `Send notification succeeded. ${d}`);  
            })
        } );
          
          req.on('error', function(e) {
            tl.setResult(tl.TaskResult.Failed, `Send notification failed.${e}`);  
          });
          
          req.write(JSON.stringify(oneSignalData));
          req.end();
      
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
     
}

run();


