import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair } from '@solana/web3.js'
import { Zoku } from '../target/types/zoku'

describe('zoku', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Zoku as Program<Zoku>

  const zokuKeypair = Keypair.generate()

  it('Initialize Zoku', async () => {
    await program.methods
      .initialize()
      .accounts({
        zoku: zokuKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([zokuKeypair])
      .rpc()

    const currentCount = await program.account.zoku.fetch(zokuKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Zoku', async () => {
    await program.methods.increment().accounts({ zoku: zokuKeypair.publicKey }).rpc()

    const currentCount = await program.account.zoku.fetch(zokuKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Zoku Again', async () => {
    await program.methods.increment().accounts({ zoku: zokuKeypair.publicKey }).rpc()

    const currentCount = await program.account.zoku.fetch(zokuKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Zoku', async () => {
    await program.methods.decrement().accounts({ zoku: zokuKeypair.publicKey }).rpc()

    const currentCount = await program.account.zoku.fetch(zokuKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set zoku value', async () => {
    await program.methods.set(42).accounts({ zoku: zokuKeypair.publicKey }).rpc()

    const currentCount = await program.account.zoku.fetch(zokuKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the zoku account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        zoku: zokuKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.zoku.fetchNullable(zokuKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
