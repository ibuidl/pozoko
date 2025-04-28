use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct StakePool{

    //stake count
    pub stake_count: u64,

    //stake nft
    pub nft_mint_account: Pubkey,

    #[max_len(100)]
    pub stake_list: Vec<StakeInfo>,

    //stake pool create time
    pub staked_pool_at: u64,
}

impl StakePool{

    pub const SEED_PREFIX: &'static str = "stake_pool_v1";


    pub fn new(nft_mint_account: Pubkey) -> Self{
        let clock = Clock::get().unwrap();
        let staked_at = clock.epoch;

        Self{
            stake_count:0,
            nft_mint_account,
            stake_list:Vec::new(),
            staked_pool_at:staked_at,
        }
    }
}




#[account]
#[derive(InitSpace)]
pub struct StakeInfo{

    //stake user
    pub staker: Pubkey,

    //stake nft
    pub nft_mint_account: Pubkey,

    //stake amount
    pub staked_at: u64,
}

impl StakeInfo{

    pub fn new(staker: Pubkey, nft_mint_account: Pubkey) -> Self{
        let clock = Clock::get().unwrap();
        let staked_at = clock.epoch;

        Self{
            staker,
            nft_mint_account,
            staked_at,
        }
    }
}