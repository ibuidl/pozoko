import { useDefaultWallet } from "./api/wallet";
import { createProfile } from "./api/profile";
import { createChannel, releaseNftForChannel } from "./api/channel";
import BN from "bn.js";




(async () => {

    const defaultWallet = useDefaultWallet();

    const[profilePicture, name, websiteUrl, bio, emil,xUrl,wrapcastUrl,magicEdenUrl,leamsUrl,discordUrl] = 
    ["test12we", "test12we", "test12we", "test12we", "test12we", "test12we", "test12we", "test12we", "test12we","test12we"]

    const tx = await createProfile(defaultWallet, profilePicture, name, websiteUrl, bio, emil,xUrl,wrapcastUrl,magicEdenUrl,leamsUrl,discordUrl)
    console.log(tx)

    const now = new Date().getTime();
    const nowBn = new BN(now);
    const[channelTitle,image,channelSubType,channelType,description,channelCreateAt] = ["我的第一个频道", "cid", 1,1,"一些描述", nowBn]
    const tx1 = await createChannel(defaultWallet, channelTitle,image,channelSubType,channelType,description,channelCreateAt)
    console.log(tx1)

    const tx2 = await releaseNftForChannel(defaultWallet, channelTitle, image, channelSubType, channelType, description, channelCreateAt)
    console.log(tx2)

})()