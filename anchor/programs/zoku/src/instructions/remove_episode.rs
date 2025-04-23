use anchor_lang::prelude::*;
use crate::state::podcast::*;
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct RemoveEpisode<'info> {
    #[account(mut, signer)]
    pub creator: Signer<'info>,
    #[account(
        mut,
        has_one = creator,
        seeds = [b"podcast", creator.key().as_ref()],
        bump = podcast.bump
    )]
    pub podcast: Account<'info, Podcast>,
}

pub fn handler(ctx: Context<RemoveEpisode>, index: u32) -> Result<()> {
    let podcast = &mut ctx.accounts.podcast;
    if (index as usize) >= podcast.episodes.len() {
        return err!(ErrorCode::InvalidEpisodeIndex);
    }
    podcast.episodes.remove(index as usize);
    Ok(())
}