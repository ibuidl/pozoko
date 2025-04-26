import BN from "bn.js";
import {
    program,
    provider,
    mintAccount,
    associatedTokenAccount,
} from "./accounts";
import { getAccount } from "@solana/spl-token";

const testNft = () => {
    describe("nft", () => {
        it("create nft", async () => {
            await program.methods
                .createNft({
                    podcastId: "1",
                    name: "testName",
                    symbol: "testSymbol",
                    uri: "testUri",
                    sellerFeeBasisPoints: 5,
                })
                .rpc();

            const mintAccountInfo = await provider.connection.getAccountInfo(
                mintAccount
            );

            expect(mintAccountInfo).not.toBeNull();
        });

        it("mint nft", async () => {
            await program.methods
                .mintNft({
                    podcastId: "1",
                    amount: new BN(2),
                })
                .rpc();

            const tokenAccountInfo = await getAccount(
                provider.connection,
                associatedTokenAccount
            );

            expect(tokenAccountInfo.amount.toString()).toBe("2");
        });
    });
};

export default testNft;
