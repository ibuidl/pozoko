use anchor_lang::prelude::*;

use std::ops::DerefMut;

use crate::states::{ CreatorAccount, UserInitialized};

pub fn initialize_creator(
    ctx: Context<CreatorCreate>,
    nickname: String ,
    avatar: String,
) -> Result<()> {   
    let creator_account =  ctx.accounts.creator_account.deref_mut();

    creator_account.nickname = nickname;
    creator_account.owner = ctx.accounts.owner.key();
    creator_account.is_frozen = false;
    creator_account.created_at = Clock::get().unwrap().unix_timestamp;
    creator_account.total_viewers = 0;
    creator_account.avatar = avatar;

    emit!(UserInitialized {
        creator: creator_account.key(),
        nickname: creator_account.nickname.clone(),
        created_at: creator_account.created_at,
    });
    Ok(())
}

#[derive(Accounts)]
pub struct CreatorCreate<'info> {
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
    pub creator_account: Box<Account<'info, CreatorAccount>>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>,
}