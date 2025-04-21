import { PublicKey } from "@solana/web3.js";
import { ChannelEtfMint, initChannelEtf } from "./api/channel";
import { initCreator } from "./api/creator";
import { useDefaultWallet, useVisitorWallet } from "./api/wallet";
import BN from "bn.js";

(async () => {
  const defaultWallet = useDefaultWallet();
  const wallet02 = useVisitorWallet();

  //   const r1 = await initCreator(defaultWallet, "test", "test");
  //   console.log(r1);

  //   const channelNftArgs = {
  //     name: "My Channel3",
  //     symbol: "MC3",
  //     url: "https://example.com/metadata.json",
  //     description: "This is a test channel",
  //     creators: [
  //       {
  //         address: defaultWallet.publicKey,
  //         verified: false,
  //         share: 50,
  //       },
  //       {
  //         address: wallet02.publicKey,
  //         verified: false,
  //         share: 50,
  //       },
  //     ],
  //     ipfsHash: "https://example.com/avatar.png",
  //     isEnabled: true,
  //     typeOfCost: { free: {} },
  //     sellerFeeBasisPoints: 500,
  //   };
  //   const r2 = await initChannelEtf(defaultWallet, channelNftArgs);
  //   console.log(r2);

  // J3hyzSJyyYAhA6y3Pb3Q9Ai11Pp9xy9rVVgbaxKXFxan
  const mint_address = new PublicKey(
    "J3hyzSJyyYAhA6y3Pb3Q9Ai11Pp9xy9rVVgbaxKXFxan"
  );
  const r3 = await ChannelEtfMint(defaultWallet, mint_address, new BN(1000));
  console.log(r3);
})();
