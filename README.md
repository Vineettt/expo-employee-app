# expo-employee-app

##REACT NATIVE APP

Install node modules

```
npm install
```

Edit CreateEmployee.js handlerUpload function
Create account on cloudinary

```
  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "APP_NAME"); //create a bucket
    data.append("cloud_name", "USERNAME"); // cloudinar account username
    fetch("https://api.cloudinary.com/v1_1/USERNAME/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPicture(data.url);
        setModal(false);
      });
  };
```

##start expo app

```
npm start
```
