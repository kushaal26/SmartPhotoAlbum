function getPhoto() {
  var apigClient = apigClientFactory.newClient({
    apiKey: "yKTg2oEmktOpUjaoBrGv3UWWlhCPoEl6KLjdMv54",
  });
  var user_message = document.getElementById("note-textarea").value;
  var body = {};
  var params = { q: user_message };
  var additionalParams = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  apigClient
    .searchGet(params, body, additionalParams)
    .then(function (result) {
      console.log(result);
      rdata = result.data;
      length_of_response = rdata.length;
      document.getElementById("inner-container").innerHTML = "";
      if (length_of_response == 0) {
        document.getElementById("custom_message").innerHTML =
          "Try with another keyword, no images found.";
        document.getElementById("custom_message").style.display = "block";
      }

      rdata.forEach(function (obj) {
        var img = new Image();
        // img.src = "https://photos-bucket-1.s3.amazonaws.com/" + obj;
        img.src = obj;
        http: img.setAttribute("class", "banner-img w-1/3 h-1/4 py-8");
        img.setAttribute("alt", "effy");
        document.getElementById("custom_message").innerHTML = "Photos found:-";
        document.getElementById("inner-container").appendChild(img);
        document.getElementById("custom_message").style.display = "block";
      });
    })
    .catch(function (result) {});
}

// function convertImgBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     console.log("reader");
//     console.log(reader);

//     reader.onload = () => {
//       let encoded2 = reader.result.replace(/^data:(.*;base64,)?/, "");
//       if (encoded2.length % 4 > 0) {
//         encoded2 += "=".repeat(4 - (encoded2.length % 4));
//       }
//       let encoded = reader.result;
//       console.log("encoder2");
//       console.log(encoded2);
//       console.log("encoder");
//       console.log(encoded);
//       resolve(encoded);
//     };

//     reader.onerror = (error) => reject(error);
//   });
// }

function imgSuccess() {
  alert("Image Uploaded Successfully");
}

function imgFail() {
  alert("Image Not Uploaded. Try Again!");
}

function submitPhoto() {
  var img_file = document.getElementById("file_path").files[0];
  var mlabels = document.getElementById("clabel").value;

  //  var base64_image = convertImgBase64(img_file).then(
  //    promise_data => {
  //    var apigClient = apigClientFactory.newClient({
  //                      apiKey: "yKTg2oEmktOpUjaoBrGv3UWWlhCPoEl6KLjdMv54"
  //         });

  //    var request_body = promise_data;
  //    var params = {"key" : img_file.name, "bucket" : "photos-bucket-1", "Content-Type" : img_file.type, "x-amz-meta-CustomLabels": mlabels};

  //    console.log(params)

  //    var additionalParams = {};

  //    apigClient.uploadBucketKeyPut(params, request_body , additionalParams).then(function(res){
  //      if (res.status == 200)
  //      {
  //        imgSuccess();
  //      }
  //      else{
  //       imgFail();
  //      }
  //    })
  //  });

  console.log("changing to axios");
  console.log(img_file);

  let config = {
    headers: {
      "Content-Type": img_file.type,
      "X-Api-Key": "yKTg2oEmktOpUjaoBrGv3UWWlhCPoEl6KLjdMv54",
      "x-amz-meta-customlabels": mlabels,
    },
  };
  url =
    "https://q7gnsp2ljb.execute-api.us-east-1.amazonaws.com/dev/upload/photos-bucket-1/" +
    img_file.name;
  axios.put(url, img_file, config).then((response) => {
    // console.log(response.data)
    alert("Upload successful!!");
  });
}
