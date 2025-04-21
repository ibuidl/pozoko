use std::fmt::Result;

use anchor_lang::{context, prelude::*};

use crate::states::{ChannelInfo, EpisodeInfo};


pub fn initialize_ep(
    ctx:Context<EpCreate>,
)->Result<()>{

}

#[derive(Accounts)]
pub struct EpCreate<'info> {
    #[account(
        init, 
        payer = creator, 
        space = 8 + EpisodeInfo::INIT_SPACE,
        seeds = [
            EpisodeInfo::SEED_PREFIX.as_bytes(), 
            &creator.key().as_ref(),
            &channel_info.key().as_ref(),
        ],
        bump
    )]
    pub ep_account: Box<Account<'info, EpisodeInfo>>,

    pub channel_info: Account<'info, ChannelInfo>,

    #[account(mut)]
    pub creator: Signer<'info>,

    pub system_program: Program<'info, System>,
}