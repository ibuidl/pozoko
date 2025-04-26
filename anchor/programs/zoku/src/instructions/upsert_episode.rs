use crate::args::UpsertEpisodeArgs;
use crate::contexts::UpsertEpisodeContext;
use crate::events::UpsertEpisodeEvent;
use anchor_lang::prelude::*;

pub fn upsert_episode(ctx: Context<UpsertEpisodeContext>, args: UpsertEpisodeArgs) -> Result<()> {
    let podcast_account = &mut ctx.accounts.podcast_account;
    let episode_account = &mut ctx.accounts.episode_account;

    if episode_account.last_modify == 0 {
        podcast_account.episode_count += 1;
    }

    episode_account.metadata_cid = args.metadata_cid;
    episode_account.last_modify = Clock::get()?.unix_timestamp;

    emit!(UpsertEpisodeEvent {
        episode: episode_account.key(),
        podcast: ctx.accounts.podcast_account.key(),
        author: ctx.accounts.authority.key(),
        last_modify: episode_account.last_modify,
        metadata_cid: episode_account.metadata_cid.clone(),
    });

    Ok(())
}
