use anchor_lang::prelude::*;



#[account]
#[derive(InitSpace)]
pub struct EpisodeInfo{

    //episode create time
    pub create_at: u64,

    //episode title
    #[max_len(500)]
    pub title: String,

    //episode image
    #[max_len(1000)]
    pub image: String,

    //episode audio file link
    #[max_len(500)]
    pub url: String,

    //episode income
    pub income: u64,

    //episode price
    pub price: u64,
}

impl EpisodeInfo{
    pub const SEED_PREFIX: &'static str = "episode_v1";

    pub const MIN_BALANCE: u64 = 20_000_000;

    pub const LISTENER_SHARE: u8 = 5;
}