use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct User {
    pub last_modify: i64,
    pub podcast_count: u32,

    #[max_len(50)]
    pub metadata_cid: String,
}

impl User {
    pub const SEED_PREFIX: &'static str = "zoku_user";
}
