use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Podcast {
    pub author: Pubkey,
    pub last_modify: i64,
    pub episode_count: u32,
    pub nft_mint_count: u32,

    #[max_len(50)]
    pub metadata_cid: String,
}

impl Podcast {
    pub const SEED_PREFIX: &'static str = "zoku_podcast";
    pub const NFT_SEED_PREFIX: &'static str = "zoku_nft";
}
