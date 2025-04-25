use anchor_lang::prelude::*;
use crate::state::episode_info::EpisodeInfo;


#[account]
#[derive(InitSpace)]
pub struct ChannelInfo{

    //channel title
    #[max_len(500)]
    pub title: String,

    //channel cover image
    #[max_len(10000)]
    pub image: String,

    //channel subscribe type(free or pay)
    pub channel_sub_type: i32,

    //channel type(text, audio or video)
    pub channel_type: i32,

    pub creator: Pubkey,

    //subscribe total
    pub follow: i64,

    //create time
    pub create_at: u64,

    //channel description
    #[max_len(500)]
    pub description: String,
    
    //episode list
    #[max_len(1000)]
    pub episode_list: Vec<EpisodeInfo>,
}

impl ChannelInfo{
    pub const SEED_PREFIX: &'static str = "channel_v1";

    pub const MIN_BALANCE: u64 = 30_000_000;

    pub const LISTENER_SHARE: u8 = 5;
}