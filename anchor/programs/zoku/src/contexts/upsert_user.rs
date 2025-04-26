use crate::states::User;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct UpsertUserContext<'info> {
    #[account(
        init_if_needed,
        payer = authority,
        space = 8 + User::INIT_SPACE,
        seeds = [
            User::SEED_PREFIX.as_bytes(),
            authority.key().as_ref()
        ],
        bump,
    )]
    pub user_account: Account<'info, User>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
