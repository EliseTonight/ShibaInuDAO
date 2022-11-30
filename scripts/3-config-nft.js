import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDrop = await sdk.getContract("0x993BD153D76A5734F5D8455D373ddc91000B2C98", "edition-drop");
    await editionDrop.createBatch([
      {
        name: "ShibaInu Pass",
        description: "This NFT will give you access to ShibaInuDAO!",
        image: readFileSync("scripts/assets/shiba.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();