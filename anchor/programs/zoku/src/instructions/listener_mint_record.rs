use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token};

use crate::{ChannelInfo, EpisodeInfo, ListenerMintArgs, ListenerMintRecord};




pub fn listener_trans_record(ctx: Context<ListenerMintRecordCreate>, args:ListenerMintArgs) -> Result<()>{
    let create_at = args.episode_create_at.clone();
    let listener_trans_record = args.create_listener_mint_record();
    ctx.accounts.listener_mint_account.set_inner(listener_trans_record.clone());
    let episode_infos = &mut ctx.accounts.channel_info_account.episode_list;
    for episode in episode_infos.iter_mut(){
        if episode.create_at == create_at {
            episode.income += listener_trans_record.amount;
        }
    }
    Ok(())
}


#[derive(Accounts)]
#[instruction(args:ListenerMintArgs)]
pub struct ListenerMintRecordCreate<'info>{

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

    #[account(
        init_if_needed,
        payer = authority,
        space = 8 + ListenerMintRecord::INIT_SPACE,
        seeds = [
            ListenerMintRecord::SEED_PREFIX.as_bytes(),
            args.episode_create_at.to_string().as_ref(),
            channel_info_account.key().as_ref(),
            authority.key().as_ref(),
        ],
        bump,
    )]

    pub listener_mint_account: Box<Account<'info, ListenerMintRecord>>,


    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,

    pub token_program: Program<'info, Token>,
}