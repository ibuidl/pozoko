use anchor_lang::prelude::*;


#[account]
#[derive(InitSpace)]
pub struct StakeInfo{

    //stake user
    pub staker: Pubkey,

    //stake nft
    pub nft_mint_account: Pubkey,

    //Claimable Royalty Amount
    pub amount: u64,

    //stake amount
    pub staked_at: u64,
}

impl StakeInfo{

    pub const SEED_PREFIX: &'static str = "stake_v1";


    pub fn new(staker: Pubkey, nft_mint_account: Pubkey) -> Self{
        let clock = Clock::get().unwrap();
        let staked_at = clock.epoch;

        Self{
            staker,
            nft_mint_account,
            amount:0,
            staked_at,
        }
    }
}