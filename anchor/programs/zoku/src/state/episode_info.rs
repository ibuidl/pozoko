use anchor_lang::prelude::*;


#[account]
#[derive(InitSpace)]
pub struct EpisodeInfo{

    //episode create time
    pub publish_at: u64,

    //episode title
    #[max_len(500)]
    pub title: String,

    //episode image cid
    #[max_len(1000)]
    pub image_cid: String,

    //episode audio file link
    #[max_len(500)]
    pub cid: String,

    //episode income
    pub income: u64,

    //episode price
    pub price: u64,

    #[max_len(500)]
    pub descripe: String,

    pub play_type: u8,

    pub visible_range: u8,

    pub publish_at_type: u8,

    #[max_len(3)]
    pub platform: Vec<u8>,

    pub is_publish: u8,
}

impl EpisodeInfo{
    pub const SEED_PREFIX: &'static str = "episode_v1";

    pub const MIN_BALANCE: u64 = 20_000_000;

    pub const LISTENER_SHARE: u8 = 5;
}