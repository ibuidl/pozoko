use crate::state::channel_data::ChannelData;
use anchor_lang::{prelude::*};


#[account]
pub struct ChannelArgs{

    //channel unique key
    pub id: u64,

    //channel title
    pub title: String,

    //channel cover image
    pub image: String,

    //channel type(free or pay)
    pub channel_type: i32,

    //channel description
    pub description: String,
}

impl ChannelArgs{
    pub fn create_channel_data(self, creator: Pubkey)->ChannelData{
        
        let clock = Clock::get().unwrap();
        ChannelData{
            title:self.title,
            image:self.image,
            channel_type: self.channel_type,
            follow:0,
            creator,
            create_at:clock.unix_timestamp,
            description:self.description,
            eps: Vec::new(),
        }

    }   
}