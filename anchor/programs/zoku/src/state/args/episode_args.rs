use anchor_lang::prelude::*;
use crate::state::episode_info::EpisodeInfo;



#[account]
pub struct EpisodeArgs{

    //channel unique key
    pub channel_id: u64,

    //channel version
    pub channel_version: String,

    //episode unique key
    pub episode_id: u64,

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
            episode_id:self.episode_id,
            title:self.title,
            image: self.image,
            url:self.url,
            publish_at:clock.unix_timestamp,
        }

    }   
}