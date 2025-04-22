use std::fmt::Result;

use anchor_lang::{context, prelude::*};

use crate::states::EpisodeInfo;


pub fn initialize_ep(
    ctx
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
            &creator.key().as_ref()
        ],
        bump
    )]
    pub ep_account: Box<Account<'info, EpisodeInfo>>,


    #[account(mut)]
    pub creator: Signer<'info>,

    pub system_program: Program<'info, System>,
}