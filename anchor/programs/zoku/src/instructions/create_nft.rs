use crate::args::CreateNftArgs;
use crate::contexts::CreateNftContext;
use crate::events::CreateNftEvent;
use crate::states::Podcast;
use anchor_lang::prelude::*;
use anchor_spl::metadata::{
    create_metadata_accounts_v3, mpl_token_metadata::types::DataV2, CreateMetadataAccountsV3,
};

pub fn create_nft(ctx: Context<CreateNftContext>, args: CreateNftArgs) -> Result<()> {
    let podcast_account = &mut ctx.accounts.podcast_account;
    let authority_key = &mut ctx.accounts.authority.key();
    let signer_seeds: &[&[&[u8]]] = &[&[
        Podcast::NFT_SEED_PREFIX.as_bytes(),
        args.podcast_id.as_bytes(),
        authority_key.as_ref(),
        &[ctx.bumps.mint_account],
    ]];

    create_metadata_accounts_v3(
        CpiContext::new(
            ctx.accounts.token_metadata_program.to_account_info(),
            CreateMetadataAccountsV3 {
                metadata: ctx.accounts.metadata_account.to_account_info(),
                mint: ctx.accounts.mint_account.to_account_info(),
                mint_authority: ctx.accounts.mint_account.to_account_info(),
                payer: ctx.accounts.authority.to_account_info(),
                update_authority: ctx.accounts.mint_account.to_account_info(),
                system_program: ctx.accounts.system_program.to_account_info(),
                rent: ctx.accounts.rent.to_account_info(),
            },
        )
        .with_signer(signer_seeds),
        DataV2 {
            name: args.name.to_string(),
            symbol: args.symbol.to_string(),
            uri: args.uri.to_string(),
            seller_fee_basis_points: args.seller_fee_basis_points,
            creators: None,
            collection: None,
            uses: None,
        },
        false,
        true,
        None,
    )?;

    podcast_account.nft_mint_count += 1;

    emit!(CreateNftEvent {
        mint: ctx.accounts.mint_account.key(),
        podcast: podcast_account.key(),
        authority: *authority_key,
        name: args.name.clone(),
        symbol: args.symbol.clone(),
        uri: args.uri.clone(),
    });

    Ok(())
}
