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

    pub image_cid: String,

    //episode cover image
    pub cid: String,

    pub descripe: String,

    pub play_type: u8,

    pub visible_range: u8,

    pub publish_at_type: u8,

    pub platform: Vec<u8>,

    pub is_publish: u8,
}

impl EpisodeArgs{

    pub fn create_episode_info(self)->EpisodeInfo{
        
        EpisodeInfo{
            publish_at:self.episode_create_at,
            title:self.episode_title,
            image_cid: self.image_cid,
            cid:self.cid,
            income:0,
            price:EpisodeInfo::MIN_BALANCE,
            descripe: self.descripe,
            play_type: self.play_type,
            visible_range: self.visible_range,
            publish_at_type: self.publish_at_type,
            platform: self.platform,
            is_publish: self.is_publish,
        }

    } 
}