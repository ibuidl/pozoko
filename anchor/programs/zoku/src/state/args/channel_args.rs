use crate::state::channel_info::ChannelInfo;
use anchor_lang::{prelude::*};


#[account]
pub struct ChannelArgs{

    //channel title
    pub channel_title: String,

    //channel cover image
    pub image: String,

    //channel subscribe type(free or pay)
    pub channel_sub_type: i32,

    //channel type(text, audio or video)
    pub channel_type: i32,

    //channel description
    pub description: String,

    //create time
    pub channel_create_at: u64,
}

impl ChannelArgs{
    pub fn create_channel_data(self, creator: Pubkey)->ChannelInfo{
        
        ChannelInfo{
            title:self.channel_title,
            image:self.image,
            channel_sub_type:self.channel_sub_type,
            channel_type: self.channel_type,
            follow:0,
            creator,
            create_at:self.channel_create_at,
            description:self.description,
            episode_list:Vec::new(),
        }

    }   
}