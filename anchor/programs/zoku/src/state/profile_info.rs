use anchor_lang::prelude::*;



#[account]
#[derive(InitSpace)]
pub struct ProfileInfo{

    //profile picture, this is ipfs cid
    #[max_len(10000)]
    pub profile_picture: String,

    //profile name
    #[max_len(10000)]
    pub name: String,

    //website url
    #[max_len(10000)]
    pub website_url: String,

    //bio
    #[max_len(10000)]
    pub bio: String,

    #[max_len(10000)]
    pub emil: String,

    //x address
    #[max_len(10000)]
    pub x_url: String,

    //wrapcast address
    #[max_len(10000)]
    pub wrapcast_url: String,

    //Magic Eden
    #[max_len(10000)]
    pub magic_eden_url: String,

    //Leams
    #[max_len(10000)]
    pub leams_url: String,

    //Discord
    #[max_len(10000)]
    pub discord_url: String,

    pub channel_count: u64,
}

impl ProfileInfo{
    pub const SEED_PREFIX: &'static str = "profile";
}