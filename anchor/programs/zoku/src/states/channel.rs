use anchor_lang::prelude::*;
use anchor_spl::metadata::mpl_token_metadata;

#[account]
#[derive(InitSpace)]
pub struct ChannelInfo {
    pub nft_mint_account: Pubkey,
    pub nft_mint_amount: u16,
    pub is_enabled: bool,
    pub num_of_audios: u64,
    pub created_at: i64,
    pub type_of_cost: TypeOfCost,

    #[max_len(20)]
    pub name: String,

    #[max_len(10)]
    pub symbol: String,

    #[max_len(100)]
    pub description: String,

    #[max_len(10)]
    pub creators: Vec<Creator>, //creator[0] is main creator

    #[max_len(200)]
    pub avatar: String,

    #[max_len(30)]
    pub episodes: Vec<EpisodeInfo>,
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
    pub is_published: bool,
    pub rewards: u64,

    #[max_len(20)]
    pub name: String,

    #[max_len(10)]
    pub symbol: String,

    #[max_len(200)]
    pub metadata_cid: String,
}

impl EpisodeInfo {
    pub const SEED_PREFIX: &'static str = "episodeInfo_v1";
}
