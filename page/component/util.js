import axios from "axios";

export default async function uploadImgToGcs(imageArr, regionKey, depth1, depth2, depth3, depth4) {
  console.log("***********");
  console.log(imageArr);
  let promiseArray = [];

  for (let i = 0; i < imageArr.length; i++) {
    promiseArray.push(
      axios({
        method: "POST",
        url: "http://172.30.1.60:9999/api/upload",
        // url: "http://34.64.101.255/api/upload",
        data: {
          name: imageArr[i].name,
          img: imageArr[i].url,
          depth1: depth1,
          depth2: depth2,
          depth3: depth3,
          depth4: depth4,
          regionKey,
        },
      })
    );
  }

  await Promise.all(promiseArray)
    .then((result) => {
      let resultArray = result.map((v) => v.data);
      console.log("===== 업로드 성공 =====");
      console.log(resultArray);
    })
    .catch((err) => {
      console.log("=====", err.response.data.message, "=====");
      // console.log(err.response.data);
      console.log("파일명 : ", err.response.data.target);
      console.log("원인 : ", err.response.data.error.msg);
    });

  return Promise.all(promiseArray);
}
