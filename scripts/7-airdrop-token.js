import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    // This is the address to our ERC-1155 membership NFT contract.
    const editionDrop = await sdk.getContract("0x993BD153D76A5734F5D8455D373ddc91000B2C98", "edition-drop");
    // This is the address to our ERC-20 token contract.
    const token = await sdk.getContract("0xc1dab31a43F457d3dB5F9287DA1Fb5730d121D62", "token");
    // Grab all the addresses of people who own our membership NFT, which has 
    // a tokenId of 0.
    console.log("333333",editionDrop.history);
    const tokenId = "0";
    const walletAddresses = ["0xc52abe5dd6f5cdde2f5fac36d9faae93cd3cbfa4","0xb46eda1636689ac513cd8604d9a40f8e200901b3","0xae669f94a4f2a12f5824cdde2a45a6db47aee09d"]//await editionDrop.history.getAllClaimerAddresses;
    console.log("444444");
    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
      );
      process.exit(0);
    }

    // Loop through the array of addresses.
    const airdropTargets = walletAddresses.map((address) => {
      // Pick a random # between 1000 and 10000.
      const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

      // Set up the target.
      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };

      return airdropTarget;
    });

    // Call transferBatch on all our airdrop targets.
    console.log("🌈 Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();