
import testUpsertUser from "./upsertUser";
import testUpsertPodcast from "./upsertPodcast";
import testUpsertEpisode from "./upsertEpisode";
import testNft from "./nft";

describe("zoku", () => {
    testUpsertUser();
    testUpsertPodcast();
    testUpsertEpisode();
    testNft();
});
