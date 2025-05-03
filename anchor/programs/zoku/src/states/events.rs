use anchor_lang::prelude::*;

use super::Creator;

#[event]
pub struct UserInitialized {
    pub creator: Pubkey,
    pub nickname: String,
    pub created_at: i64,
}

#[event]
pub struct ChannelEtfCreateEvent {
    pub channel_etf_mint: Pubkey,
    pub creators: Vec<Creator>,
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
