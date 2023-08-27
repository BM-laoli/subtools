const axios = require('axios');
const { sendMail } = require('../tools/sendEmail');

let lastNoticeData = null;

// subscribe 订阅通知
const doJob = async () => {
  const res = await axios.get(
    'https://learn.open.com.cn/StudentCenter/Notice/GetNoticeJson',
    {
      headers: {
        Cookie:
          'isShowFirseLesson=false; TINGYUN_DATA=%7B%22id%22%3A%22Bh2WiTd4XZM%235NgGGAS-Y8U%22%2C%22n%22%3A%22WebAction%2FMVC%2FNotice%252FIndex%22%2C%22tid%22%3A%2226945606774d11354c1f5%22%2C%22q%22%3A0%2C%22a%22%3A36%7D; c=kzcbC3L2-1681303044664-d6df251147e8a-1597930910; _fmdata=86RfOmQBFuh4szCIGhHMtJZ%2FYjW8HcoNBsQOX74kxDN9f7VgYamlhBXfmPeaIyhIVhyn9405kIrJJfNFSQVRuA%3D%3D; _xid=xIuuNGP586w2k7VhTz1SDDjVq%2FJiDUaMoOSCXOTEHeE%3D; Hm_lvt_686401bd1a1f7184252b460af0f4337e=1693105200; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22a18376621755%22%2C%22first_id%22%3A%221877576e5e01452-07c5fb524189f4-26031851-2073600-1877576e5e114c9%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E8%87%AA%E7%84%B6%E6%90%9C%E7%B4%A2%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fwww.bing.com%2F%22%7D%2C%22%24device_id%22%3A%221877576e5e01452-07c5fb524189f4-26031851-2073600-1877576e5e114c9%22%7D; _gid=GA1.3.487223251.1693105206; ASP.NET_SessionId=e1eg0ybejiryciey11ymkal3; Hm_lpvt_686401bd1a1f7184252b460af0f4337e=1693105438; _gat=1; _ga=GA1.1.257755733.1693105206; _ga_34B604LFFQ=GS1.1.1693105207.1.1.1693105444.43.0.0',
      },
    },
  );
  console.log('res.data', res.data);
  !lastNoticeData && (lastNoticeData = res.data);
  if (lastNoticeData.message != res.data.message) {
    lastNoticeData = res.data;
    sendSms(res.data);
  }
};

// 发送Emial
const sendSms = (data) => {
  sendMail({
    from: '18376621755@163.com',
    to: 'bmlishizeng@gmail.com',
    subject: '✨✨!SubScribe Notice!✨',
    html: `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title></title>
          <style>
            li {
              list-style: none;
              margin-bottom: 20px;
            }
            .content {
              margin-left: 80px;
            }
          </style>
        </head>
        <body>
          <h2>Hi Joney</h2>
          <span>你有新消息 </span>
          <p>未读消息数为: <span style="color: red;">${data.message}</span></p>
          <div class="content">
            ${listDom(data.data)}
          </div>
        </body>
        </html>
    `,
  });
};

const listDom = (data) => {
  let li = '';
  data.forEach((item) => {
    li += `<li>
      <a href="https://learn.open.com.cn">${item.NoticeName}</a>
    </li>
    `;
  });
  return li;
};

// main
const main = () => {
  // 设定一个interval, 每隔一段20分钟执行一次
  setInterval(
    () => {
      setTimeout(
        () => {
          doJob();
        },
        Math.random() * 1000 * 1,
      );
    },
    1000 * 60 * 1,
  );
};

module.exports = {
  main,
};
