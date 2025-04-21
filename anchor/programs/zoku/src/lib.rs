#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;
pub mod instructions;
pub mod state;

pub use state::*;
pub use instructions::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod zoku {
    use super::*;

  pub fn close(_ctx: Context<CloseZoku>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.zoku.count = ctx.accounts.zoku.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.zoku.count = ctx.accounts.zoku.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeZoku>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.zoku.count = value.clone();
    Ok(())
  }

  //create channel
  pub fn create_channel(ctx: Context<ChannelCreate>, args: ChannelArgs) ->Result<()>{
    instructions::channel_create::channel_create(ctx, args);
    Ok(())
  }

  //publish episode
  pub fn publish_episode(ctx: Context<EpisodeCreate>, args: EpisodeArgs) -> Result<()>{
    instructions::episode_create::episode_create(ctx, args);
    Ok(())
  }

}

#[derive(Accounts)]
pub struct InitializeZoku<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Zoku::INIT_SPACE,
  payer = payer
  )]
  pub zoku: Account<'info, Zoku>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseZoku<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub zoku: Account<'info, Zoku>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub zoku: Account<'info, Zoku>,
}

#[account]
#[derive(InitSpace)]
pub struct Zoku {
  count: u8,
}
