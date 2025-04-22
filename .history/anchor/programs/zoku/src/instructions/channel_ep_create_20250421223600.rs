use anchor_lang::prelude::*;

use std:: ops::DerefMut;

use crate::states::{ChannelInfo, EpisodeInfo};


pub fn initialize_ep(
    ctx: Context<EpCreate>,
    metadata_cid: String,
) -> Result<()> {
    let ep_account =  ctx.accounts.ep_account.deref_mut();
    let channel_info = ctx.accounts.channel_info.deref_mut();
    
    ep_account.channel = ctx.accounts.channel_info.key();
    ep_account.created_at = Clock::get().unwrap().unix_timestamp;
    ep_account.likes = 0;
    ep_account.is_published = false;
    ep_account.rewards = 0;
    ep_account.metadata_cid = metadata_cid;
    Ok(())
}

#[derive(Accounts)]
#[instruction(metadata_cid:String)]
pub struct EpCreate<'info> {
    #[account(
        init_if_needed, 
        payer = creator, 
        space = 8 + EpisodeInfo::INIT_SPACE,
        seeds = [
            EpisodeInfo::SEED_PREFIX.as_bytes(), 
            &creator.key().as_ref(),
            &channel_info.key().as_ref(),
            &metadata_cid.as_bytes()
        ],
        bump
    )]
    pub ep_account: Box<Account<'info, EpisodeInfo>>,

    #[account(mut)]
    pub channel_info: Account<'info, ChannelInfo>,

    #[account(mut)]
    pub creator: Signer<'info>,

    pub system_program: Program<'info, System>,
}