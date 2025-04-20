use crate::state::channel_data::ChannelData;
use anchor_lang::{prelude::*};


#[account]
pub struct ChannelArgs{

    //频道序号
    pub order: i32,

    //频道名称
    pub title: String,

    //封面图片
    pub image: String,


    //频道描述
    pub description: String,
}

impl ChannelArgs{
    fn create_channel_data(self, creator: Pubkey)->ChannelData{
        
        let clock = Clock::get().unwrap();
        ChannelData{
            title:self.title,
            image:self.image,
            creator,
            create_at:clock.unix_timestamp,
            description:self.description,
            eps: Vec::new(),
        }

    }   
}