use anchor_lang::prelude::*;

use super::Creator;

#[event]
pub struct UserInitialized {
    pub user: Pubkey,
    pub nickname: String,
    pub created_at: i64,
}

#[event]
pub struct ChannelNftCreateEvent {
    pub channel_nft_mint: Pubkey,
    pub main_creator: Creator,
    pub channel_info_address: Pubkey,
    pub channel_name: String,
    pub channel_symbol: String,
    pub created_at: i64,
}

#[event]
pub struct ChannelNftMintEvent {
    pub channel_nft_mint: Pubkey,
    pub creator: Pubkey,
    pub amount: u64,
}

#[event]
pub struct EpisodeCreatedEvent {
    pub episode_name: String,
    pub episode_symbol: String,
    pub channel: Pubkey,
    pub creator: Pubkey,
    pub metadata_cid: String,
    pub created_at: i64,
}
