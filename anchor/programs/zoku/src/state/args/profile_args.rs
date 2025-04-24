use crate::ProfileInfo;
use anchor_lang::{prelude::*};


#[account]
pub struct ProfileArgs{

    //profile picture, this is ipfs cid
    pub profile_picture: String,

    //profile name
    pub name: String,

    //website url
    pub website_url: String,

    //bio
    pub bio: String,

    pub emil: String,

    //x address
    pub x_url: String,

    //wrapcast address
    pub wrapcast_url: String,

    //Magic Eden
    pub magic_eden_url: String,

    //Leams
    pub leams_url: String,

    //Discord
    pub discord_url: String,
}

impl ProfileArgs{
    pub fn create_profile_info(self)->ProfileInfo{
        
        ProfileInfo{
            profile_picture:self.profile_picture,
            name:self.name,
            website_url:self.website_url,
            bio:self.bio,
            emil:self.emil,
            x_url:self.x_url,
            wrapcast_url:self.wrapcast_url,
            magic_eden_url:self.magic_eden_url,
            leams_url:self.leams_url,
            discord_url:self.discord_url,
            channel_count:0,
        }

    }   
}