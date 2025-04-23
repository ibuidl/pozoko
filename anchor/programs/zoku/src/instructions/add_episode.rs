use anchor_lang::prelude::*;
use crate::state::podcast::*;
use crate::state::episode::*;
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct AddEpisode<'info> {
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
    ctx: Context<AddEpisode>,
    title: String,
    audio_ipfs_cid: String,
    audio_url_fallback: String,
    publication_date: i64,
    description: String,
    duration: String,
    episode_guid: String,
    image_url: Option<String>,
    is_free: bool, // 新增参数
) -> Result<()> {
    let podcast = &mut ctx.accounts.podcast;
    if podcast.episodes.len() >= Podcast::MAX_EPISODES {
        return err!(ErrorCode::TooManyEpisodes);
    }
    if title.len() > Episode::MAX_TITLE_LENGTH {
        return err!(ErrorCode::TitleTooLong);
    }
    if audio_ipfs_cid.len() > Episode::MAX_AUDIO_CID_LENGTH {
        return err!(ErrorCode::AudioCidTooLong);
    }
    if audio_url_fallback.len() > Episode::MAX_AUDIO_URL_FALLBACK_LENGTH {
        return err!(ErrorCode::AudioUrlFallbackTooLong);
    }
    if description.len() > Episode::MAX_DESCRIPTION_LENGTH {
        return err!(ErrorCode::EpisodeDescriptionTooLong);
    }
    if duration.len() > Episode::MAX_DURATION_LENGTH {
        return err!(ErrorCode::EpisodeDurationTooLong);
    }
    if episode_guid.len() > Episode::MAX_EPISODE_GUID_LENGTH {
        return err!(ErrorCode::EpisodeGuidTooLong);
    }
    if let Some(ref i) = image_url {
        if i.len() > Episode::MAX_IMAGE_URL_LENGTH {
            return err!(ErrorCode::EpisodeImageUrlTooLong);
        }
    }

    podcast.episodes.push(Episode {
        title,
        audio_ipfs_cid,
        audio_url_fallback,
        publication_date,
        description,
        duration,
        episode_guid,
        image_url: image_url.unwrap_or_default(),
        is_free, // 使用传入的 is_free 值
    });
    Ok(())
}