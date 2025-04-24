use anchor_lang::prelude::*;
use crate::state::ListenerMintRecord;



#[account]
pub struct ListenerMintArgs{

    //channel unique key
    pub channel_title: String,

    //channel create time
    pub channel_create_at: u64,

    //episode create time
    pub episode_create_at: u64,

    //episode title
    pub episode_title: String,

    //user pay amount
    pub amount: u64,
}

impl ListenerMintArgs{


    pub fn create_listener_mint_record(self)->ListenerMintRecord{
        
        ListenerMintRecord{
            channel_title:self.channel_title,
            channel_create_at:self.channel_create_at,
            episode_title:self.episode_title,
            episode_create_at:self.episode_create_at,
            amount:self.amount,
        }

    }   
}