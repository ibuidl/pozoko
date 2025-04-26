use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Episode {
    pub podcast: Pubkey,
    pub author: Pubkey,
    pub last_modify: i64,

    #[max_len(50)]
    pub metadata_cid: String,
}

impl Episode {
    pub const SEED_PREFIX: &'static str = "zoku_episode";
}
