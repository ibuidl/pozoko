use anchor_lang::prelude::*;
use anchor_spl::{
    metadata::{
        create_metadata_accounts_v3, mpl_token_metadata::types::DataV2, CreateMetadataAccountsV3,
        Metadata,
    },
    token::{Mint, Token},
};


use crate::states::{ ChannelEtfCreateEvent, ChannelInfo,  Creator, TypeOfCost};
use crate::error::ErrorCode;


#[account]
pub struct ChannelNftArgs {
    pub name: String,
    pub symbol: String,
    pub url: String,
    pub description: String,
    pub creators: Vec<Creator>,
    pub avatar: String,
    pub is_enabled: bool,
    pub type_of_cost: TypeOfCost,
    pub seller_fee_basis_points: u16
}

impl ChannelNftArgs {
    fn create_account(
        self, 
        mint_account: Pubkey ,
    ) -> ChannelInfo {
        let clock = Clock::get().unwrap();

        ChannelInfo {
            creators: self.creators,
            is_enabled: self.is_enabled,
            avatar: self.avatar,
            description: self.description,
            type_of_cost: self.type_of_cost,
            mint_account:mint_account,
            like: 0,
            mint_amount: 0,
            num_of_subscribers: 0,
            num_of_audios: 0,
            created_at: clock.unix_timestamp,
        }
    }
}

pub fn channel_nft_create(ctx: Context<ChannelNFTCreate>, args: ChannelNftArgs) -> Result<()> {
    let total_share: u8 = args.creators.iter().map(|creator| creator.share).sum();
    require!(total_share == 100, ErrorCode::InvalidCreatorShare);

    // PDA signer seeds
    let m = ctx.accounts.channel_mint_account.key();   
    let signer_seeds: &[&[&[u8]]] = &[&[
        ChannelInfo::SEED_PREFIX.as_bytes(),
        m.as_ref(),
        &[ctx.bumps.channel_info],
    ]];

    create_metadata_accounts_v3(
        CpiContext::new_with_signer(
            ctx.accounts.token_metadata_program.to_account_info(),
            CreateMetadataAccountsV3 {
                metadata: ctx.accounts.metadata_account.to_account_info(),
                mint: ctx.accounts.channel_mint_account.to_account_info(),
                mint_authority: ctx.accounts.channel_info.to_account_info(),
                update_authority: ctx.accounts.channel_info.to_account_info(),
                payer: ctx.accounts.owner.to_account_info(),
                system_program: ctx.accounts.system_program.to_account_info(),
                rent: ctx.accounts.rent.to_account_info(),
            },
            signer_seeds,
        ),
        DataV2 {
            name: args.name.to_string(),
            symbol: args.symbol.to_string(),
            uri: args.url.to_string(),
            seller_fee_basis_points: args.seller_fee_basis_points,
            creators: ChannelInfo::convert_to_metadata_creators(args.creators.clone()),
            collection: None,
            uses: None,
        },
        true,
        true,
        None,
    )?;

    msg!(" Channel NFT created successfully.");

    ctx.accounts.channel_info.set_inner(args.create_account(
        ctx.accounts.channel_mint_account.key(),
    ));

    emit!(ChannelEtfCreateEvent {
        channel_etf_mint: ctx.accounts.channel_mint_account.key(),
        creators: ctx.accounts.channel_info.creators.clone()
    });

    Ok(())
}

#[derive(Accounts)]
#[instruction(args: ChannelNftArgs)]
pub struct ChannelNFTCreate<'info> {
    #[account(
        init_if_needed,
        payer = owner,
        space = 8 + ChannelInfo::INIT_SPACE,
        seeds = [
            ChannelInfo::SEED_PREFIX.as_bytes(),
            channel_mint_account.key().as_ref(),          
        ],
        bump,
    )]
    pub channel_info: Account<'info, ChannelInfo>,

    /// CHECK: Validate address by deriving pda
    #[account(
        mut,
        seeds = [
            b"metadata",
            token_metadata_program.key().as_ref(),
            channel_mint_account.key().as_ref()
        ],
        bump,
        seeds::program = token_metadata_program.key(),
    )]
    pub metadata_account: UncheckedAccount<'info>,

    #[account(
        init,
        payer = owner,
        seeds = [
            ChannelInfo::SEED_PREFIX.as_bytes(),
            args.symbol.as_bytes(), 
        ],
        bump,
        mint::decimals = 0,
        mint::authority = channel_info.key(), 
    )]
    pub channel_mint_account: Account<'info, Mint>,


    pub rent: Sysvar<'info, Rent>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub token_metadata_program: Program<'info, Metadata>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}
