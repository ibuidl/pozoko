use anchor_lang::prelude::*;


#[account]
pub struct SubscribeArgs{

    //channel_nft_mint_account
    pub channel_id: u64,

    //channel_nft_amount
    pub amount: u64,
}