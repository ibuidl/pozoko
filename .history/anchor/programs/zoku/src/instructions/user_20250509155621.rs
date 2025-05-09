use anchor_lang::prelude::*;

use std::ops::DerefMut;

use crate::states::{  UserAccount, UserInitialized};

pub fn initialize_user(
    ctx: Context<UserCreate>,
    nickname: String ,
    avatar: String,
) -> Result<()> {   
    let user_account =  ctx.accounts.user_account.deref_mut();

    user_account.nickname = nickname;
    user_account.owner = ctx.accounts.owner.key();
    user_account.is_frozen = false;
    user_account.created_at = Clock::get().unwrap().unix_timestamp;
    user_account.avatar = avatar;

    emit!(UserInitialized {
        user: user_account.key(),
        nickname: user_account.nickname.clone(),
        created_at: user_account.created_at,
        owner: user_account.owner.key(),
    });
    Ok(())
}
pub fn update_user(
    ctx: Context<UserUpdate>,
    nickname: String,
    avatar: String,
) -> Result<()> {
    let user_account =  ctx.accounts.user_account.deref_mut();

    user_account.nickname = nickname;
    user_account.avatar = avatar;

    Ok(())
}

#[derive(Accounts)]
pub struct UserCreate<'info> {
    #[account(
        init_if_needed, 
        payer = owner, 
        space = 8 + UserAccount::INIT_SPACE,
        seeds = [
            UserAccount::SEED_PREFIX.as_bytes(), 
            &owner.key().as_ref()
        ],
        bump
    )]
    pub user_account: Box<Account<'info, UserAccount>>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UserUpdate<'info> {
    #[account(mut)]
    pub user_account: Box<Account<'info, UserAccount>>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>,
}