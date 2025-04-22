use std::{fmt::Result, ops::DerefMut};

use anchor_lang::prelude::*;

use crate::states::{ChannelInfo, EpisodeInfo};


pub fn initialize_ep(
    ctx:Context<EpCreate>,
)->Result<()>{
    let ep_account =  ctx.accounts.ep_account.deref_mut();
    ep_account.channel = ctx.accounts.channel_info.key();
    ep_account.created_at = Clock::get().unwrap().unix_timestamp;
    ep_account.likes = 0;
    ep_account.is_published = false;
    Ok(())
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