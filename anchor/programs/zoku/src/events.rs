use anchor_lang::prelude::*;

#[event]
pub struct UpsertUserEvent {
    pub user: Pubkey,
    pub podcast_count: u32,
    pub last_modify: i64,
    pub metadata_cid: String,
}

#[event]
pub struct UpsertPodcastEvent {
    pub podcast: Pubkey,
    pub episode_count: u32,
    pub nft_mint_count: u32,
    pub last_modify: i64,
    pub metadata_cid: String,
}

#[event]
pub struct UpsertEpisodeEvent {
    pub episode: Pubkey,
    pub podcast: Pubkey,
    pub author: Pubkey,
    pub last_modify: i64,
    pub metadata_cid: String,
}

#[event]
pub struct CreateNftEvent {
    pub mint: Pubkey,
    pub podcast: Pubkey,
    pub authority: Pubkey,
    pub name: String,
    pub symbol: String,
    pub uri: String,
}

#[event]
pub struct MintNftEvent {
    pub mint: Pubkey,
    pub to: Pubkey,
    pub amount: u64,
}
