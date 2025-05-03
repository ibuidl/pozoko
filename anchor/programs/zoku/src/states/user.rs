use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct CreatorAccount {
    pub owner: Pubkey,
    pub is_frozen: bool,
    pub created_at: i64,

    pub total_viewers: u64,

    #[max_len(20)]
    pub nickname: String,

    #[max_len(200)]
    pub avatar: String,

    pub padding: [u64; 10],
}

impl CreatorAccount {
    pub const SEED_PREFIX: &'static str = "creatorAccount_v1";
}
