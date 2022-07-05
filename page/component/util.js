import axios from "axios";

/**
 *
 * @param {object : { name : base64 }}} image
 */
export default async function uploadImgToGcs(image, userkey) {
  let promiseArray = [];
  console.log("image: ", image);

  for (let key in image) {
    promiseArray.push(
      axios({
        method: "POST",
        url: "http://172.30.1.42:9999/api/upload",
        data: {
          img: image[key],
          photoName: key,
        },
      })
    );
  }

  await Promise.all(promiseArray)
    .then((result) => {
      let resultArray = result.map((v) => v.data);
      console.log(resultArray);
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response.data.message);
    });
}
