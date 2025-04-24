use anchor_lang::prelude::*;
use crate::state::episode_info::EpisodeInfo;



#[account]
pub struct EpisodeArgs{

    //channel unique key
    pub channel_title: String,

    //channel create time
    pub channel_create_at: u64,

    //episode create time
    pub episode_create_at: u64,

    //episode title
    pub episode_title: String,

    //episode image
    pub image: String,

    //episode cover image
    pub url: String,
}

impl EpisodeArgs{

    pub fn create_episode_info(self)->EpisodeInfo{
        
        EpisodeInfo{
            create_at:self.episode_create_at,
            title:self.episode_title,
            image: self.image,
            url:self.url,
            income:0,
            price:EpisodeInfo::MIN_BALANCE,
        }

    } 
}