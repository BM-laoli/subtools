const { main } = require('./src/job/aoPen.js');
const { APIStart } = require('./src/apis.js');
// 循环=20 mini 循环后的触发 = 60 s * 10 随机数
main(20, 60);
APIStart();
