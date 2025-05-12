use anchor_lang::prelude::*;
use std::ops::DerefMut;

use crate::states::ChannelModelConfig;
use crate::error::ErrorCode;

pub fn create_channel_model_config(
    ctx: Context<ChannelModelConfigCreate>,
    max_channel_nft_mint: u16,
) -> Result<()> {
    let user_model_config =  ctx.accounts.channel_model_config.deref_mut();
    require!(max_channel_nft_mint <=9999, ErrorCode::InvalidAmount);

    user_model_config.max_channel_nft_mint = max_channel_nft_mint; 
    
    Ok(())
}

#[derive(Accounts)]
pub struct ChannelModelConfigCreate<'info> {

    #[account(
        init,
        payer = creator, 
        space = 8+ ChannelModelConfig::INIT_SPACE,
        seeds = [
            ChannelModelConfig::CONFIG_PREFIX_SEED.as_bytes(),
            &creator.key().as_ref(),
        ],
        bump,   
         
    )]
    pub channel_model_config: Account<'info, ChannelModelConfig>,

    #[account(
        mut,
        address = crate::admin::id() @ ErrorCode::InvalidOwner
    )]
    pub creator: Signer<'info>,

    pub system_program: Program<'info, System>,
      
}