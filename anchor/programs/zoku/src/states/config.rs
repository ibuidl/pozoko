use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct ChannelModelConfig {
    pub max_channel_nft_mint: u16,
}

impl ChannelModelConfig {
    pub const CONFIG_PREFIX_SEED: &'static str = "ChannelModelConfig_v1";
}
