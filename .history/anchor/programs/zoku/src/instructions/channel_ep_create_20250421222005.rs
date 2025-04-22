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
        init_if_needed, 
        payer = owner, 
        space = 8 + CreatorAccount::INIT_SPACE,
        seeds = [
            CreatorAccount::SEED_PREFIX.as_bytes(), 
            &owner.key().as_ref()
        ],
        bump
    )]
    pub ep_account: Box<Account<'info, EpisodeInfo>>,
}