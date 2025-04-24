use anchor_lang::prelude::*;



#[account]
#[derive(InitSpace)]
pub struct ListenerMintRecord{

    //channel unique key
    #[max_len(500)]
    pub channel_title: String,

    //channel create time
    pub channel_create_at: u64,

    //episode create time
    pub episode_create_at: u64,

    //episode title
    #[max_len(500)]
    pub episode_title: String,

    //user pay amount
    pub amount: u64,
}


impl ListenerMintRecord{
    pub const SEED_PREFIX: &'static str = "mint_episode";
}