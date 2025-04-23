use anchor_lang::prelude::*;
use instructions::*;
use state::*;
use errors::*;

declare_id!("11111111111111111111111111111111"); 

pub mod instructions {
    pub mod create_podcast;
    pub mod update_podcast_metadata;
    pub mod add_episode;
    pub mod remove_episode;
}

pub mod state {
    pub mod podcast;
    pub mod episode;
}

pub mod errors;

#[program]
pub mod podcast_platform {
    use super::*;

    pub fn create_podcast(ctx: Context<instructions::create_podcast::CreatePodcast>, name: String, description: String, link: String, language: String, category: String, image_url: String, /* explicit: bool */) -> Result<()> {
        instructions::create_podcast::handler(ctx, name, description, link, language, category, image_url/*, explicit*/)
    }

    pub fn update_podcast_metadata(ctx: Context<instructions::update_podcast_metadata::UpdatePodcastMetadata>, name: Option<String>, description: Option<String>, link: Option<String>, language: Option<String>, category: Option<String>, image_url: Option<String>, /* explicit: Option<bool> */) -> Result<()> {
        instructions::update_podcast_metadata::handler(ctx, name, description, link, language, category, image_url/*, explicit*/)
    }

    pub fn add_episode(ctx: Context<instructions::add_episode::AddEpisode>, title: String, audio_ipfs_cid: String, audio_url_fallback: String, publication_date: i64, description: String, duration: String, episode_guid: String, image_url: Option<String>, is_free: bool) -> Result<()> {
        instructions::add_episode::handler(ctx, title, audio_ipfs_cid, audio_url_fallback, publication_date, description, duration, episode_guid, image_url, is_free)
    }

    pub fn remove_episode(ctx: Context<instructions::remove_episode::RemoveEpisode>, index: u32) -> Result<()> {
        instructions::remove_episode::handler(ctx, index)
    }
}