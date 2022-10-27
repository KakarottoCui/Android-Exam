
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/set/set","pages/userinfo/userinfo","pages/public/login","pages/user/user","pages/test/test","pages/public/addPaper","pages/public/paperList","pages/public/addQuestion","pages/public/addUser","pages/public/questionList","pages/public/paperInfo","pages/public/userList","pages/public/examPage","pages/public/examResPage","pages/public/examUserList"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#f8f8f8"},"tabBar":{"color":"#C0C4CC","selectedColor":"#2979ff","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/tab-home.png","selectedIconPath":"static/tab-home-current2.png","text":"首页"},{"pagePath":"pages/test/test","iconPath":"static/tab-cate.png","selectedIconPath":"static/tab-cate-current.png","text":"考试"},{"pagePath":"pages/user/user","iconPath":"static/tab-my.png","selectedIconPath":"static/tab-my-current.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"在线考试APP","compilerVersion":"3.6.4","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"titleNView":{"type":"transparent","searchInput":{"backgroundColor":"rgba(231, 231, 231,.7)","borderRadius":"16px","placeholder":"请输入试卷名称","placeholderColor":"#606266"}}}},{"path":"/pages/set/set","meta":{},"window":{"navigationBarTitleText":"设置"}},{"path":"/pages/userinfo/userinfo","meta":{},"window":{"navigationBarTitleText":"修改资料"}},{"path":"/pages/public/login","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","titleNView":false,"animationType":"slide-in-bottom"}},{"path":"/pages/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","bounce":"none","titleNView":{"type":"transparent","buttons":[{"fontSrc":"/static/yticon.ttf","text":"","fontSize":"24","color":"#303133","width":"46px","background":"rgba(0,0,0,0)"}]}}},{"path":"/pages/test/test","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的考试","bounce":"none"}},{"path":"/pages/public/addPaper","meta":{},"window":{"navigationBarTitleText":"编辑试卷","enablePullDownRefresh":false}},{"path":"/pages/public/paperList","meta":{},"window":{"navigationBarTitleText":"试卷列表","enablePullDownRefresh":false}},{"path":"/pages/public/addQuestion","meta":{},"window":{"navigationBarTitleText":"编辑试题","enablePullDownRefresh":false}},{"path":"/pages/public/addUser","meta":{},"window":{"navigationBarTitleText":"编辑人员","enablePullDownRefresh":false}},{"path":"/pages/public/questionList","meta":{},"window":{"navigationBarTitleText":"试题列表","enablePullDownRefresh":false}},{"path":"/pages/public/paperInfo","meta":{},"window":{"navigationBarTitleText":"考试管理","enablePullDownRefresh":false}},{"path":"/pages/public/userList","meta":{},"window":{"navigationBarTitleText":"人员管理","enablePullDownRefresh":false}},{"path":"/pages/public/examPage","meta":{},"window":{"navigationBarTitleText":"考试","enablePullDownRefresh":false}},{"path":"/pages/public/examResPage","meta":{},"window":{"navigationBarTitleText":"考试记录","enablePullDownRefresh":false}},{"path":"/pages/public/examUserList","meta":{},"window":{"navigationBarTitleText":"考试明细","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});