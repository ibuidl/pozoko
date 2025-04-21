use anchor_lang::prelude::*;
use crate::state::episode_info::EpisodeInfo;



#[account]
pub struct EpisodeArgs{

    //channel_nft_mint_account
    pub channel_id: u64,

    //channel title
    pub channel_title: String,

    //episode order
    pub order: u64,

    //episode title
    pub title: String,

    //episode image
    pub image: String,

    //episode cover image
    pub url: String,
}

impl EpisodeArgs{

    pub fn create_episode_info(self)->EpisodeInfo{
        
        let clock = Clock::get().unwrap();
        EpisodeInfo{
            order:self.order,
            title:self.title,
            image: self.image,
            url:self.url,
            publish_at:clock.unix_timestamp,
        }

    }   
}