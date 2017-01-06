define("app",["exports"],function(e){"use strict";function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.App=function(){function e(){t(this,e)}return e.prototype.configureRouter=function(e,t){this.router=t,e.title="Teamcity radiator",e.map([{route:"failed/:baseUrl",name:"Faled Build Overview",moduleId:"view/failed-build-overview"},{route:"running/:baseUrl",name:"Running Build Overview",moduleId:"view/running-build-overview"},{route:"config/:baseUrl",name:"Build Type Configuration",moduleId:"view/build-types-configuration"}])},e}()}),define("environment",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={debug:!1,testing:!1}}),define("main",["exports","./environment"],function(e,t){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function n(e){e.use.standardConfiguration().feature("resources"),u.default.debug&&e.use.developmentLogging(),u.default.testing&&e.use.plugin("aurelia-testing"),e.start().then(function(){return e.setRoot()})}Object.defineProperty(e,"__esModule",{value:!0}),e.configure=n;var u=i(t);Promise.config({warnings:{wForgottenReturn:!1}})}),define("anticorruptionlayer/teamcity-build-adapter",["exports","../communicationlayer/http-client-router","aurelia-framework"],function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){var i={method:"GET",headers:new Headers({Accept:"application/json","X-Requested-With":"Fetch"})};return e.fetch(t,i).then(function(e){return e.json()}).then(function(e){return e.buildType.filter(function(e){return e.builds.build.length>0}).map(function(e){return{id:e.id,name:e.name,buildNumber:e.builds.build[0].number,status:e.builds.build[0].status,statusText:e.builds.build[0].statusText,drawAttention:!1}})})}Object.defineProperty(e,"__esModule",{value:!0}),e.TeamcityBuildAdapter=void 0;var r,l;e.TeamcityBuildAdapter=(r=(0,i.inject)(t.HttpClientRouter),r(l=function(){function e(t){n(this,e),this.clientRouter=t}return e.prototype.getAllLatestFinishedBuilds=function(e){var t="http://"+e+"/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:false,canceled:false,count:1),build(number,status,statusText)))";return u(this.clientRouter,t)},e.prototype.getAllLatestRunningBuilds=function(e){var t="http://"+e+"/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:true,canceled:false,count:1),build(number,status,statusText)))";return u(this.clientRouter,t)},e}())||l)}),define("anticorruptionlayer/teamcity-build-type-adapter",["exports","../communicationlayer/http-client-router","aurelia-framework"],function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.TeamcityBuildTypeAdapter=void 0;var u,r;e.TeamcityBuildTypeAdapter=(u=(0,i.inject)(t.HttpClientRouter),u(r=function(){function e(t){n(this,e),this.clientRouter=t}return e.prototype.getBuildTypes=function(e){function t(){return{method:"GET",headers:new Headers({Accept:"application/json","X-Requested-With":"Fetch"})}}function i(e){function t(e){return e.split(" :: ").map(function(e){return{name:e}}).reduce(function(e,t){return t.label=e,t})}return e.buildType.map(function(e){return{id:e.id,name:e.name,label:t(e.projectName)}})}return this.clientRouter.fetch(e+"/guestAuth/app/rest/buildTypes",t()).then(function(e){return e.json()}).then(function(e){return i(e)})},e}())||r)}),define("communicationlayer/http-client-router",["exports","aurelia-fetch-client","./teamcitystub/team-city-http-client-stub","aurelia-framework"],function(e,t,i,n){"use strict";function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.HttpClientRouter=void 0;var r,l;e.HttpClientRouter=(r=(0,n.inject)(t.HttpClient,i.TeamCityHttpClientStub),r(l=function(){function e(t,i){u(this,e),this.realHttpClient=t,this.teamCityHttpClientStub=i}return e.prototype.fetch=function(e,t){return e.includes("stub")?this.teamCityHttpClientStub.fetch(e):this.realHttpClient.fetch(e,t)},e}())||l)}),define("resources/index",["exports"],function(e){"use strict";function t(e){}Object.defineProperty(e,"__esModule",{value:!0}),e.configure=t}),define("view/build-types-configuration",["exports","../domain/services/build-type-service","aurelia-framework"],function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.BuildTypesConfiguration=void 0;var u,r;e.BuildTypesConfiguration=(u=(0,i.inject)(t.BuildTypeService),u(r=function(){function e(t){n(this,e),this.service=t}return e.prototype.activate=function(e){var t=this;this.service.getBuildTypesGroupedByLabel(e.baseUrl).then(function(e){return t.buildTypesGroupedByLabel=e})},e}())||r)}),define("view/failed-build-overview",["exports","../domain/services/build-service","aurelia-framework"],function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.FailedBuildOverview=void 0;var u,r;e.FailedBuildOverview=(u=(0,i.inject)(t.BuildService),u(r=function(){function e(t){n(this,e),this.service=t,this.addToBlackListFailedBuilds=function(e){return t.addToBlackListFailedBuilds(e)},this.getBlackListFailedBuilds=function(){return t.getBlackListFailedBuilds()}}return e.prototype.activate=function(e){function t(e){var t=this;this.service.getAllFailedBuilds(e.baseUrl).then(function(e){t.builds=e})}t.bind(this)(e),setInterval(t.bind(this),3e4,e)},e}())||r)}),define("view/running-build-overview",["exports","../domain/services/build-service","aurelia-framework"],function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.RunningBuildOverview=void 0;var u,r;e.RunningBuildOverview=(u=(0,i.inject)(t.BuildService),u(r=function(){function e(t){n(this,e),this.buildService=t,this.addToBlacklistLatestRunningBuilds=function(e){return t.addToBlacklistLatestRunningBuilds(e)},this.getBlacklistLatestRunningBuilds=function(){return t.getBlacklistLatestRunningBuilds()}}return e.prototype.activate=function(e){function t(e){var t=this;this.buildService.getAllLatestRunningBuilds(e.baseUrl).then(function(e){t.builds=e})}t.bind(this)(e),setInterval(t.bind(this),3e4,e)},e}())||r)}),define("communicationlayer/teamcitystub/team-city-build-types-response",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={count:11,href:"/httpAuth/app/rest/buildTypes",buildType:[{id:"build_1_id",name:"build 1",projectName:"Proj1 :: SubProj1",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_1_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_1_id"},{id:"build_2_id",name:"build 2",projectName:"Proj1 :: SubProj1",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_2_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_2_id"},{id:"build_3_id",name:"build 3",projectName:"Proj2 :: SubProj1",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_3_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_3_id"},{id:"build_4_id",name:"build 4",projectName:"Proj2 :: SubProj1",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_4_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_4_id"},{id:"build_5_id",name:"same name as other build",projectName:"Proj1 :: SubProj2",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_5_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_5_id"},{id:"build_6_id",name:"same name as other build",projectName:"Proj1 :: SubProj4",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_6_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_6_id"},{id:"build_7_id",name:"build 7",projectName:"Proj1 :: SubProj2",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_7_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_7_id"},{id:"build_8_id",name:"build 8",projectName:"Proj1 :: SubProj1",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_8_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_8_id"},{id:"build_9_id",name:"build 9",projectName:"Proj1 :: SubProj1",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_9_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_9_id"},{id:"build_10_id",name:"build 3",projectName:"Proj1 :: SubProj1 :: SubProj1",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_3_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_3_id"},{id:"build_25_id",name:"build 25",projectName:"Proj5",projectId:"Proj1_SubProj1",href:"/httpAuth/app/rest/buildTypes/id:build_25_id",webUrl:"http://testurl.com/viewType.html?buildTypeId=build_25_id"}]}}),define("communicationlayer/teamcitystub/team-city-http-client-stub",["exports","./team-city-latest-builds-response","./team-city-latest-running-builds-response","./team-city-build-types-response"],function(e,t,i,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.TeamCityHttpClientStub=void 0;var l=u(t),s=u(i),a=u(n);e.TeamCityHttpClientStub=function(){function e(){r(this,e)}return e.prototype.fetch=function(e){if(e.includes("running:false"))return Promise.resolve({json:function(){return l.default}});if(e.includes("running:true"))return Promise.resolve({json:function(){return s.default}});if("host/guestAuth/app/rest/buildTypes"===e)return Promise.resolve({json:function(){return a.default}});throw new Error("team city http client stub doesn't support "+e)},e}()}),define("communicationlayer/teamcitystub/team-city-latest-builds-response",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={buildType:[{id:"build_1_id",name:"build 1",builds:{build:[{number:"3.1.70.17327",status:"FAILURE",statusText:"Tests passed: 198, ignored: 9"}]}},{id:"build_2_id",name:"build 2",builds:{build:[{number:"3.1.6965.17318",status:"SUCCESS",statusText:"Tests passed: 2391, ignored: 6"}]}},{id:"build_3_id",name:"build 3",builds:{build:[{number:"123",status:"SUCCESS",statusText:"Tests passed: 35"}]}},{id:"build_4_id",name:"build 4",builds:{build:[{number:"3.1.54.17253",status:"SUCCESS",statusText:"Tests passed: 35"}]}},{id:"build_5_id",name:"same name as other build",builds:{build:[{number:"3.1.54.17287",status:"FAILURE",statusText:"Tests failed: 4 (1 new), passed: 31"}]}},{id:"build_6_id",name:"same name as other build",builds:{build:[{number:"1.2.54.17287",status:"FAILURE",statusText:"Tests failed: 2, passed: 33; snapshot dependency failed: Main :: Data Quality Tests :: build 6"}]}},{id:"build_7_id",name:"build 7",builds:{build:[{number:"3.5.54.17287",status:"FAILURE",statusText:"Tests failed: 3, passed: 32; snapshot dependency failed: Main :: Data Quality Tests :: build 7"}]}},{id:"build_8_id",name:"build 8",builds:{build:[{number:"3.5.87.17287",status:"SUCCESS",statusText:"Tests failed: 8 (1 new), passed: 27; snapshot dependency failed: Main :: Data Quality Tests :: build 8"}]}},{id:"build_9_id",name:"build 9",builds:{build:[{number:"3.5.99.17287",status:"FAILURE",statusText:"Tests failed: 13, passed: 22; snapshot dependency failed: Main :: Data Quality Tests :: build 9"}]}},{id:"build_10_id",name:"build 10",builds:{build:[{number:"3.5.99.21",status:"FAILURE",statusText:"Tests failed: 10, passed: 25"}]}}]}}),define("communicationlayer/teamcitystub/team-city-latest-running-builds-response",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={buildType:[{id:"build_1_id",name:"build 1",builds:{build:[{number:"3.1.70.17328",status:"SUCCESS",statusText:"Tests passed: 198, ignored: 9"}]}},{id:"build_25_id",name:"build 25",builds:{build:[{number:"3.1.6965.17318",status:"SUCCESS",statusText:"Tests passed: 2391, ignored: 6"}]}},{id:"build_3_id",name:"build 3",builds:{build:[{number:"120",status:"FAILURE",statusText:"Tests passed: 35"}]}},{id:"build_4_id",name:"build 4",builds:{build:[{number:"3.1.54.17255",status:"FAILURE",statusText:"Tests passed: 35"}]}}]}}),define("domain/services/build-service",["exports","../../anticorruptionlayer/teamcity-build-adapter","aurelia-framework"],function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.BuildService=void 0;var u,r;e.BuildService=(u=(0,i.inject)(t.TeamcityBuildAdapter),u(r=function(){function e(t){n(this,e),this.teamcityBuildAdapter=t}return e.prototype.getAllFailedBuilds=function(e){var t=this;return Promise.all([this.teamcityBuildAdapter.getAllLatestFinishedBuilds(e),this.teamcityBuildAdapter.getAllLatestRunningBuilds(e)]).then(function(e){function i(e){return!this.getBlackListFailedBuilds().includes(e.id)}var n=e[0],u=e[1];return n.filter(function(e){return"FAILURE"===e.status}).filter(function(e){return i.bind(t)(e)}).map(function(e){function t(){function t(){return u.filter(function(t){return t.id===e.id})[0]}return void 0!==t()&&t().buildNumber>e.buildNumber}return e.drawAttention=t(),e})})},e.prototype.getAllLatestRunningBuilds=function(e){function t(e){return!this.getBlacklistLatestRunningBuilds().includes(e.id)}var i=this;return this.teamcityBuildAdapter.getAllLatestRunningBuilds(e).then(function(e){return e.filter(function(e){return t.bind(i)(e)}).map(function(e){return e.drawAttention=!0,e})})},e.prototype.addToBlackListFailedBuilds=function(e){localStorage.blackListFailedBuilds=JSON.stringify(this.getBlackListFailedBuilds().concat(e))},e.prototype.addToBlacklistLatestRunningBuilds=function(e){localStorage.blacklistLatestRunningBuilds=JSON.stringify(this.getBlacklistLatestRunningBuilds().concat(e))},e.prototype.getBlackListFailedBuilds=function(e){return localStorage.blackListFailedBuilds?JSON.parse(localStorage.blackListFailedBuilds):[]},e.prototype.getBlacklistLatestRunningBuilds=function(e){return localStorage.blacklistLatestRunningBuilds?JSON.parse(localStorage.blacklistLatestRunningBuilds):[]},e}())||r)}),define("domain/services/build-type-service",["exports","../../anticorruptionlayer/teamcity-build-type-adapter","aurelia-framework"],function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.BuildTypeService=void 0;var u,r;e.BuildTypeService=(u=(0,i.inject)(t.TeamcityBuildTypeAdapter),u(r=function(){function e(t){n(this,e),this.teamcityBuildTypeAdapter=t}return e.prototype.getBuildTypesGroupedByLabel=function(e){return this.teamcityBuildTypeAdapter.getBuildTypes(e).then(function(e){return e.reduce(function(e,t){function i(e){function t(){n=n[e.name]}function u(){e.label&&i(e.label)}function r(){function t(){function t(){n.type&&(n.type="label")}n[e.name]={type:"build"},t()}n[e.name]||t()}u(),r(),t()}var n=e;return i(t),e},{})})},e}())||r)}),define("view/elements/build-overview",["exports","aurelia-framework"],function(e,t){"use strict";function i(e,t,i,n){i&&Object.defineProperty(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(n):void 0})}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t,i,n,u){var r={};return Object.keys(n).forEach(function(e){r[e]=n[e]}),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=i.slice().reverse().reduce(function(i,n){return n(e,t,i)||i},r),u&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(u):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(e,t,r),r=null),r}Object.defineProperty(e,"__esModule",{value:!0}),e.BuildOverview=void 0;var r,l,s,a;e.BuildOverview=(r=function(){function e(){n(this,e),i(this,"builds",l,this),i(this,"addToBlacklist",s,this),i(this,"getBlacklist",a,this),this.showBlackList=!1}return e.prototype.getBuildStatusCssClass=function(e){if("SUCCESS"===e.status)return"alert-success";if("FAILURE"===e.status)return"alert-danger";throw new Error('The buildstatus "'+e.status+'" is invalid')},e.prototype.getDrawAttentionCssClass=function(e){if(e.drawAttention===!0)return"draw-attention";if(e.drawAttention===!1)return"";throw new Error('The drawAttention "'+e.drawAttention+'" is invalid')},e.prototype.startDrag=function(e){return this.showBlackList=!0,e.dataTransfer.setData("id",e.target.id),!0},e.prototype.endDrag=function(e){this.showBlackList=!1},e.prototype.preventEventPropagation=function(e){e.preventDefault()},e.prototype.drop=function(e){var t=this;this.addToBlacklist(e.dataTransfer.getData("id")),this.builds=this.builds.filter(function(e){return!t.getBlacklist().includes(e.id)}),this.showBlackList=!1},e}(),l=u(r.prototype,"builds",[t.bindable],{enumerable:!0,initializer:null}),s=u(r.prototype,"addToBlacklist",[t.bindable],{enumerable:!0,initializer:null}),a=u(r.prototype,"getBlacklist",[t.bindable],{enumerable:!0,initializer:null}),r)}),define("text!app.html",["module"],function(e){e.exports='<template>\n  <require from="css/custom.css"></require>\n  <router-view></router-view>\n</template>'}),define("text!css/custom.css",["module"],function(e){e.exports="@keyframes fadeIn { \n  from { opacity: 0; } \n}\n\n.draw-attention {\n    animation: fadeIn 1s infinite alternate;\n}"}),define("text!view/build-types-configuration.html",["module"],function(e){e.exports='<template>\n    <div class="col-md-12 text-center">\n test       <p>${buildTypesGroupedByLabel}</p>\n    </div>\n</template>'}),define("text!view/failed-build-overview.html",["module"],function(e){e.exports='<template>\n\t<require from="./elements/build-overview"></require>\n\t<build-overview builds.bind="builds" add-to-blacklist.bind="addToBlackListFailedBuilds" get-blacklist.bind="getBlackListFailedBuilds"></build-overview>\n</template>'}),define("text!view/running-build-overview.html",["module"],function(e){e.exports='<template>\n\t<require from="./elements/build-overview"></require>\n\t<build-overview builds.bind="builds" add-to-blacklist.bind="addToBlacklistLatestRunningBuilds" get-blacklist.bind="getBlacklistLatestRunningBuilds"></build-overview>\n</template>'}),define("text!view/elements/build-overview.html",["module"],function(e){e.exports='<template>\n    <div class="container">\n        <div class="row">\n            <div id="${build.id}" class="col-md-4 text-center ${getBuildStatusCssClass(build)} ${getDrawAttentionCssClass(build)} alert"\n                role="alert " draggable="true" dragstart.delegate="startDrag($event)" dragend.delegate="endDrag($event)" repeat.for="build of builds">\n                <h1>${build.name}</h1>\n                <p>${build.statusText}</p>\n            </div>\n        </div>\n        <div class="row" show.bind="showBlackList">\n            <div class="col-md-12 text-center alert alert-warning" drop.delegate="drop($event)" dragover.delegate="preventEventPropagation($event)">\n                <h1>Blacklist</h1>\n            </div>\n        </div>\n    </div>\n</template>'});