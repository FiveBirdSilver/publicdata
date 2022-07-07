import axios from "axios";

export default async function uploadImgToGcs(imageArr, regionKey) {
  console.log("uploadImgToGcs 실행");
  let promiseArray = [];
  if (imageArr.length === 0) {
    return;
  }

  for (let i = 0; i < imageArr.length; i++) {
    promiseArray.push(
      axios({
        method: "POST",
        // url: "http://172.30.1.91:9999/api/upload",
        url: "http://34.64.101.255/api/upload",
        data: {
          name: imageArr[i].name,
          img: imageArr[i].img,
          depth1: imageArr[i].depth1,
          depth2: imageArr[i].depth2,
          depth3: imageArr[i].depth3,
          depth4: imageArr[i].depth4,
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
      // return "promise";
      // result = resultArray;
    })
    .catch((err) => {
      console.log("=====", err.response.data.message, "=====");
      // console.log(err.response.data);
      console.log("파일명 : ", err.response.data.target);
      console.log("원인 : ", err.response.data.error.msg);
    });

  // return result1234;
}
