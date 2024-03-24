// import { IpfsStorage } from "../../hooks/ipfs";

import { create } from "ipfs-http-client";
const projectid =
  "k51qzi5uqu5dhz835g6djpuutotcq6j0jyhyy9m5fjfhrzrocwr0ncl8u8l2p6";
// const client = create("https://ipfs.infura.io:5001/api/v0/" + projectid);
const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: { "Project-ID": projectid },
});
// export const IpfsStorage = async (file) => {
//   try {
//     const added = await client.add(file);
//     const url = `https://ipfs.infura.io/ipfs/${added.path}`;
//     return url;
//   } catch (error) {
//     console.log("Error uploading file: ", error);
//   }
// };

export const IpfsStorage2 = async (file) => {
  try {
    const addImage = await client.add(file);
    const imageUrl = `ipfs://${addImage.path}`;
    // const imageUrl = `https://ipfs.infura.io/ipfs/${addImage.path}`;
    return imageUrl;
  } catch (error) {
    console.log("Error uploading file: ", error);
  }
};
