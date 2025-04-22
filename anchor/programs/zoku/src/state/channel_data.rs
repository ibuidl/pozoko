use anchor_lang::prelude::*;
use crate::state::episode_info::EpisodeInfo;


#[account]
#[derive(InitSpace)]
pub struct ChannelData{

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
    pub create_at: i64,

    //channel description
    #[max_len(500)]
    pub description: String,

    pub price: u64,

    //episode list
    #[max_len(10000)]
    pub eps: Vec<EpisodeInfo>,
}

impl ChannelData{
    pub const SEED_PREFIX: &'static str = "channel_v1";
}