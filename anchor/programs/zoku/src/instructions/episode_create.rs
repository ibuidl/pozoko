use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token};

use crate::{ChannelData, EpisodeArgs};




pub fn episode_create(ctx: Context<EpisodeCreate>, args:EpisodeArgs) -> Result<()>{
    let episode = args.create_episode_info();
    let channel_info_account = &mut ctx.accounts.channel_info_account;
    channel_info_account.eps.push(episode);
    Ok(())
}


#[derive(Accounts)]
#[instruction(args:EpisodeArgs)]
pub struct EpisodeCreate<'info>{


    #[account(
        mut,
        seeds=[
            ChannelData::SEED_PREFIX.as_bytes(),
            &args.channel_id.to_string().as_bytes(),
        ],
        bump
    )]
    pub channel_mint_account: Box<Account<'info, Mint>>,

    #[account(
        init_if_needed,
        payer = authority,
        space = 8 + ChannelData::INIT_SPACE,
        seeds = [
            channel_mint_account.key().as_ref(),
            ChannelData::SEED_PREFIX.as_bytes(),
        ],
        bump,
    )]

    pub channel_info_account: Box<Account<'info, ChannelData>>,


    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,

    pub token_program: Program<'info, Token>,
}