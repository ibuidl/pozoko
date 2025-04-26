use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct UpsertPodcastArgs {
    pub metadata_cid: String,
    pub podcast_id: String,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct UpsertEpisodeArgs {
    pub metadata_cid: String,
    pub podcast_id: String,
    pub episode_id: String,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct CreateNftArgs {
    pub podcast_id: String,
    pub name: String,
    pub symbol: String,
    pub uri: String,
    pub seller_fee_basis_points: u16,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct MintNftArgs {
    pub podcast_id: String,
    pub amount: u64,
}
