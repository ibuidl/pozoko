use crate::contexts::UpsertUserContext;
use crate::events::UpsertUserEvent;
use anchor_lang::prelude::*;

pub fn upsert_user(ctx: Context<UpsertUserContext>, metadata_cid: String) -> Result<()> {
    let user_account = &mut ctx.accounts.user_account;

    if user_account.last_modify == 0 {
        user_account.podcast_count = 0;
    }

    user_account.metadata_cid = metadata_cid;
    user_account.last_modify = Clock::get().unwrap().unix_timestamp;

    emit!(UpsertUserEvent {
        user: user_account.key(),
        podcast_count: user_account.podcast_count,
        last_modify: user_account.last_modify,
        metadata_cid: user_account.metadata_cid.clone(),
    });

    Ok(())
}
