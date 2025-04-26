import {
    program,
    userAccount,
    podcastAccount1,
    podcastAccount2,
} from "./accounts";

const testUpsertPodcast = () => {
    describe("upsertPodcast", () => {
        it("create podcast", async () => {
            await program.methods
                .upsertPodcast({ metadataCid: "initialCid", podcastId: "1" })
                .rpc();

            const { podcastCount } = await program.account.user.fetch(
                userAccount
            );
            const { metadataCid, episodeCount, nftMintCount } =
                await program.account.podcast.fetch(podcastAccount1);

            expect(podcastCount).toBe(1);
            expect(metadataCid).toBe("initialCid");
            expect(episodeCount).toBe(0);
            expect(nftMintCount).toBe(0);
        });

        it("update podcast", async () => {
            await program.methods
                .upsertPodcast({ metadataCid: "updatedCid", podcastId: "1" })
                .rpc();

            const { metadataCid } = await program.account.podcast.fetch(
                podcastAccount1
            );

            expect(metadataCid).toBe("updatedCid");
        });

        it("create another podcast", async () => {
            await program.methods
                .upsertPodcast({ metadataCid: "initialCid", podcastId: "2" })
                .rpc();

            const { podcastCount } = await program.account.user.fetch(
                userAccount
            );
            const { metadataCid, episodeCount, nftMintCount } =
                await program.account.podcast.fetch(podcastAccount2);

            expect(podcastCount).toBe(2);
            expect(metadataCid).toBe("initialCid");
            expect(episodeCount).toBe(0);
            expect(nftMintCount).toBe(0);
        });
    });
};

export default testUpsertPodcast;
