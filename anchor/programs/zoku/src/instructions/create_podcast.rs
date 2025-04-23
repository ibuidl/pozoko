use anchor_lang::prelude::*;
use crate::state::podcast::*;
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct CreatePodcast<'info> {
    #[account(mut, signer)]
    pub creator: Signer<'info>,
    #[account(
        init,
        payer = creator,
        space = 8 + Podcast::MAX_SIZE,
        seeds = [b"podcast", creator.key().as_ref()],
        bump
    )]
    pub podcast: Account<'info, Podcast>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<CreatePodcast>,
    name: String,
    description: String,
    link: String,
    language: String,
    category: String,
    image_url: String,
    /* explicit: bool, */
) -> Result<()> {
    if name.len() > Podcast::MAX_NAME_LENGTH {
        return err!(ErrorCode::NameTooLong);
    }
    if description.len() > Podcast::MAX_DESCRIPTION_LENGTH {
        return err!(ErrorCode::DescriptionTooLong);
    }
    if link.len() > Podcast::MAX_LINK_LENGTH {
        return err!(ErrorCode::LinkTooLong);
    }
    if language.len() > Podcast::MAX_LANGUAGE_LENGTH {
        return err!(ErrorCode::LanguageTooLong);
    }
    if category.len() > Podcast::MAX_CATEGORY_LENGTH {
        return err!(ErrorCode::CategoryTooLong);
    }
    if image_url.len() > Podcast::MAX_IMAGE_URL_LENGTH {
        return err!(ErrorCode::ImageUrlTooLong);
    }

    let podcast = &mut ctx.accounts.podcast;
    podcast.creator = ctx.accounts.creator.key();
    podcast.name = name;
    podcast.description = description;
    podcast.link = link;
    podcast.language = language;
    podcast.category = category;
    podcast.image_url = image_url;
    podcast.episodes = Vec::new();
    podcast.bump = *ctx.bumps.get("podcast").unwrap();
    Ok(())
}