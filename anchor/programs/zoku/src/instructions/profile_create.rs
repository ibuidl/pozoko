
use anchor_lang::prelude::*;

use crate::{ProfileArgs, ProfileInfo};



pub fn profile_create(ctx: Context<ProfileCreate>, args:ProfileArgs) -> Result<()>{
    //set profile info into pda account
    let profile_info = args.create_profile_info();
    ctx.accounts.profile_account.set_inner(profile_info.clone());

    Ok(())
}


#[derive(Accounts)]
#[instruction(args:ProfileArgs)]
pub struct ProfileCreate<'info>{

    #[account(
        init_if_needed,
        payer = authority,
        space = 8 + ProfileInfo::INIT_SPACE,
        seeds = [
            ProfileInfo::SEED_PREFIX.as_bytes(),
            authority.key().as_ref(),
        ],
        bump,
    )]

    pub profile_account: Box<Account<'info, ProfileInfo>>,


    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}