import {
    program,
    podcastAccount1,
    episodeAccount1,
    episodeAccount2,
} from "./accounts";

const testUpsertEpisode = () => {
    describe("upsertEpisode", () => {
        it("create episode", async () => {
            await program.methods
                .upsertEpisode({
                    metadataCid: "initialCid",
                    podcastId: "1",
                    episodeId: "1",
                })
                .rpc();

            const { episodeCount } = await program.account.podcast.fetch(
                podcastAccount1
            );
            const { metadataCid } = await program.account.episode.fetch(
                episodeAccount1
            );

            expect(episodeCount).toBe(1);
            expect(metadataCid).toBe("initialCid");
        });

        it("update episode", async () => {
            await program.methods
                .upsertEpisode({
                    metadataCid: "updatedCid",
                    podcastId: "1",
                    episodeId: "1",
                })
                .rpc();

            const { metadataCid } = await program.account.episode.fetch(
                episodeAccount1
            );

            expect(metadataCid).toBe("updatedCid");
        });

        it("create another episode", async () => {
            await program.methods
                .upsertEpisode({
                    metadataCid: "initialCid",
                    podcastId: "1",
                    episodeId: "2",
                })
                .rpc();

            const { episodeCount } = await program.account.podcast.fetch(
                podcastAccount1
            );
            const { metadataCid } = await program.account.episode.fetch(
                episodeAccount2
            );

            expect(episodeCount).toBe(2);
            expect(metadataCid).toBe("initialCid");
        });
    });
};

export default testUpsertEpisode;
