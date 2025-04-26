use crate::args::UpsertPodcastArgs;
use crate::states::{Podcast, User};
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(args: UpsertPodcastArgs)]
pub struct UpsertPodcastContext<'info> {
    #[account(
        mut,
        seeds = [
            User::SEED_PREFIX.as_bytes(),
            authority.key().as_ref()
        ],
        bump,
    )]
    pub user_account: Account<'info, User>,

    #[account(
        init_if_needed,
        payer = authority,
        space = 8 + Podcast::INIT_SPACE,
        seeds = [
            Podcast::SEED_PREFIX.as_bytes(),
            args.podcast_id.as_bytes(),
            authority.key().as_ref(),
        ],
        bump,
    )]
    pub podcast_account: Account<'info, Podcast>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
