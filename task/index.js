"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
const https = require("https");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var appId = tl.getInput('appId', true);
            var restApiKey = tl.getInput('restApiKey', true);
            var title = tl.getInput('title', true);
            var message = tl.getInput('message', true);
            let oneSignalData = {
                app_id: appId,
                included_segments: ["Subscribed Users"],
                title: { "en": title },
                contents: { "en": message },
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
                console.log(`statusCode: ${res.statusCode}`);
                res.on('data', d => {
                    tl.setResult(tl.TaskResult.Succeeded, `Send notification succeeded. ${d}`);
                });
            });
            req.on('error', function (e) {
                tl.setResult(tl.TaskResult.Failed, `Send notification failed.${e}`);
            });
            req.write(JSON.stringify(oneSignalData));
            req.end();
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
