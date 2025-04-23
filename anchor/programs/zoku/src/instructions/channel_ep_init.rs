use anchor_lang::prelude::*;

use std::ops::DerefMut;

use crate::error::ErrorCode;
use crate::states::{ChannelInfo, EpisodeCreatedEvent, EpisodeInfo};

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct EpisodeArgs {
    pub is_published: bool,
    pub name: String,
    pub symbol: String,
    pub metadata_cid: String,
}

impl EpisodeArgs {
    fn create_account(self, channel: Pubkey) -> EpisodeInfo {
        let clock = Clock::get().unwrap();

        EpisodeInfo {
            channel: channel,
            created_at: clock.unix_timestamp,
            is_published: self.is_published,
            rewards: 0,
            metadata_cid: self.metadata_cid,
            name: self.name,
            symbol: self.symbol,
        }
    }
}
pub fn initialize_ep(ctx: Context<EpCreate>, args: EpisodeArgs) -> Result<()> {
    let channel_address = ctx.accounts.channel_info.key();
    let channel_info = ctx.accounts.channel_info.deref_mut();

    channel_info
        .episodes
        .push(args.create_account(channel_address));

    channel_info.num_of_audios = channel_info
        .num_of_audios
        .checked_add(1)
        .ok_or(ErrorCode::MathOverflow)?;

    let last_episode = channel_info.episodes.last().unwrap().clone();

    emit!(EpisodeCreatedEvent {
        episode_name: last_episode.name,
        episode_symbol: last_episode.symbol,
        channel: channel_address,
        creator: ctx.accounts.creator.key(),
        metadata_cid: last_episode.metadata_cid,
        created_at: last_episode.created_at,
    });
    Ok(())
}

#[derive(Accounts)]
#[instruction(metadata_cid:String)]
pub struct EpCreate<'info> {
    #[account(mut)]
    pub channel_info: Account<'info, ChannelInfo>,

    #[account(mut)]
    pub creator: Signer<'info>,

    pub system_program: Program<'info, System>,
}
