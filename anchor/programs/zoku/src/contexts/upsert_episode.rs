use crate::args::UpsertEpisodeArgs;
use crate::states::{Episode, Podcast};
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(args: UpsertEpisodeArgs)]
pub struct UpsertEpisodeContext<'info> {
    #[account(
        mut,
        seeds = [
            Podcast::SEED_PREFIX.as_bytes(),
            args.podcast_id.as_bytes(),
            authority.key().as_ref(),
        ],
        bump,
    )]
    pub podcast_account: Account<'info, Podcast>,

    #[account(
        init_if_needed,
        payer = authority,
        space = 8 + Episode::INIT_SPACE,
        seeds = [
            Episode::SEED_PREFIX.as_bytes(),
            args.podcast_id.as_ref(),
            args.episode_id.as_bytes(),
            authority.key().as_ref()
        ],
        bump,
    )]
    pub episode_account: Account<'info, Episode>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
