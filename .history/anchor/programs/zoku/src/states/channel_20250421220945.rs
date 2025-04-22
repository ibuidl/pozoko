use anchor_lang::prelude::*;
use anchor_spl::metadata::mpl_token_metadata;

#[account]
#[derive(InitSpace)]
pub struct ChannelInfo {
    pub mint_account: Pubkey,
    pub mint_amount: u64,
    pub is_enabled: bool,
    pub like: u64,
    pub num_of_subscribers: u64,
    pub num_of_audios: u64,
    pub created_at: i64,
    pub type_of_cost: TypeOfCost,

    #[max_len(50)]
    pub description: String,

    #[max_len(10)]
    pub creators: Vec<Creator>,

    #[max_len(200)]
    pub avatar: String,
}

#[derive(InitSpace, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct Creator {
    pub address: Pubkey,
    pub share: u8,
    pub verified: bool,
}
#[derive(InitSpace, Clone, AnchorSerialize, AnchorDeserialize)]
pub enum TypeOfCost {
    Free = 0,
    Paid = 1,
}

impl ChannelInfo {
    pub const SEED_PREFIX: &'static str = "channelInfo_v1";

    pub fn convert_to_metadata_creators(
        creators: Vec<Creator>,
    ) -> Option<Vec<mpl_token_metadata::types::Creator>> {
        Some(
            creators
                .into_iter()
                .map(|creator| mpl_token_metadata::types::Creator {
                    address: creator.address,
                    verified: creator.verified,
                    share: creator.share,
                })
                .collect(),
        )
    }
}

#[account]
#[derive(InitSpace)]
pub struct EpisodeInfo {
    pub channel: Pubkey,
    pub created_at: i64,
    pub duration: u32,
    pub views: u64,
    pub is_published: bool,

    #[max_len(200)]
    pub metadata_cid: String,
}
