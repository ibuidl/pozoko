use anchor_lang::prelude::*;


#[account]
pub struct SubscribeArgs{

    //channel create time
    pub channnel_create_at: u64,

    //channel title
    pub channel_title: String,
}