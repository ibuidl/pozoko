import { program, userAccount } from "./accounts";

const testUpsertUser = () => {
    describe("upsertUser", () => {
        it("create user", async () => {
            await program.methods.upsertUser("initialCid").rpc();

            const { metadataCid, podcastCount } =
                await program.account.user.fetch(userAccount);

            expect(metadataCid).toBe("initialCid");
            expect(podcastCount).toBe(0);
        });

        it("update user", async () => {
            await program.methods.upsertUser("updatedCid").rpc();

            const { metadataCid, podcastCount } =
                await program.account.user.fetch(userAccount);

            expect(metadataCid).toBe("updatedCid");
            expect(podcastCount).toBe(0);
        });
    });
};

export default testUpsertUser;
