use anchor_lang::prelude::*;
use crate::state::podcast::*;
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct UpdatePodcastMetadata<'info> {
    #[account(mut, signer)]
    pub creator: Signer<'info>,
    #[account(
        mut,
        has_one = creator,
        seeds = [b"podcast", creator.key().as_ref()],
        bump = podcast.bump
    )]
    pub podcast: Account<'info, Podcast>,
}

pub fn handler(
    ctx: Context<UpdatePodcastMetadata>,
    name: Option<String>,
    description: Option<String>,
    link: Option<String>,
    language: Option<String>,
    category: Option<String>,
    image_url: Option<String>,
    /* explicit: Option<bool>, */
) -> Result<()> {
    let podcast = &mut ctx.accounts.podcast;
    if let Some(name) = name {
        if name.len() > Podcast::MAX_NAME_LENGTH {
            return err!(ErrorCode::NameTooLong);
        }
        podcast.name = name;
    }
    if let Some(description) = description {
        if description.len() > Podcast::MAX_DESCRIPTION_LENGTH {
            return err!(ErrorCode::DescriptionTooLong);
        }
        podcast.description = description;
    }
    if let Some(link) = link {
        if link.len() > Podcast::MAX_LINK_LENGTH {
            return err!(ErrorCode::LinkTooLong);
        }
        podcast.link = link;
    }
    if let Some(language) = language {
        if language.len() > Podcast::MAX_LANGUAGE_LENGTH {
            return err!(ErrorCode::LanguageTooLong);
        }
        podcast.language = language;
    }
    if let Some(category) = category {
        if category.len() > Podcast::MAX_CATEGORY_LENGTH {
            return err!(ErrorCode::CategoryTooLong);
        }
        podcast.category = category;
    }
    if let Some(image_url) = image_url {
        if image_url.len() > Podcast::MAX_IMAGE_URL_LENGTH {
            return err!(ErrorCode::ImageUrlTooLong);
        }
        podcast.image_url = image_url;
    }
    Ok(())
}