use crate::args::UpsertPodcastArgs;
use crate::contexts::UpsertPodcastContext;
use crate::events::UpsertPodcastEvent;
use anchor_lang::prelude::*;

pub fn upsert_podcast(ctx: Context<UpsertPodcastContext>, args: UpsertPodcastArgs) -> Result<()> {
    let user_account = &mut ctx.accounts.user_account;
    let podcast_account = &mut ctx.accounts.podcast_account;

    if podcast_account.last_modify == 0 {
        user_account.podcast_count += 1;
        podcast_account.episode_count = 0;
        podcast_account.nft_mint_count = 0;
    }

    podcast_account.metadata_cid = args.metadata_cid;
    podcast_account.last_modify = Clock::get()?.unix_timestamp;

    emit!(UpsertPodcastEvent {
        podcast: podcast_account.key(),
        episode_count: podcast_account.episode_count,
        nft_mint_count: podcast_account.nft_mint_count,
        last_modify: podcast_account.last_modify,
        metadata_cid: podcast_account.metadata_cid.clone(),
    });

    Ok(())
}
