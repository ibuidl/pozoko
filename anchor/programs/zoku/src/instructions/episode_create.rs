use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token};

use crate::{ChannelInfo, EpisodeArgs, EpisodeInfo};




pub fn episode_create(ctx: Context<EpisodeCreate>, args:EpisodeArgs) -> Result<()>{
    let episode = args.create_episode_info();
    let channel_info_account = &mut ctx.accounts.channel_info_account;
    channel_info_account.episode_list.push(episode);
    Ok(())
}


#[derive(Accounts)]
#[instruction(args:EpisodeArgs)]
pub struct EpisodeCreate<'info>{

    #[account(
        mut,
        seeds = [
            ChannelInfo::SEED_PREFIX.as_bytes(),
            &args.channel_title.to_string().as_bytes(),
            args.channel_create_at.to_string().as_bytes(),
            authority.key().as_ref(),
        ],
        bump,
    )]

    pub channel_info_account: Box<Account<'info, ChannelInfo>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,

    pub token_program: Program<'info, Token>,
}