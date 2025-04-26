#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("4B1ETA2cRMQfEpgnavcGbgxfcnUHtJVthtGqYC9Ndgqt");

pub mod args;
pub mod contexts;
pub mod errors;
pub mod events;
pub mod instructions;
pub mod states;

use args::*;
use contexts::*;

#[program]
pub mod zoku {
    use super::*;

    pub fn upsert_user(ctx: Context<UpsertUserContext>, metadata_cid: String) -> Result<()> {
        instructions::upsert_user(ctx, metadata_cid)
    }

    pub fn upsert_podcast(
        ctx: Context<UpsertPodcastContext>,
        args: UpsertPodcastArgs,
    ) -> Result<()> {
        instructions::upsert_podcast(ctx, args)
    }

    pub fn upsert_episode(
        ctx: Context<UpsertEpisodeContext>,
        args: UpsertEpisodeArgs,
    ) -> Result<()> {
        instructions::upsert_episode(ctx, args)
    }

    pub fn create_nft(ctx: Context<CreateNftContext>, args: CreateNftArgs) -> Result<()> {
        instructions::create_nft(ctx, args)
    }

    pub fn mint_nft(ctx: Context<MintNftContext>, args: MintNftArgs) -> Result<()> {
        instructions::mint_nft(ctx, args)
    }
}
