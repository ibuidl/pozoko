use anchor_lang::prelude::*;
use crate::state::episode::*;

#[account]
pub struct Podcast {
    pub creator: Pubkey,
    pub name: String,
    pub description: String,
    pub link: String,
    pub language: String,
    pub category: String,
    pub image_url: String,
    pub explicit: bool,
    pub episodes: Vec<Episode>,
    pub bump: u8,
}

impl Podcast {
    pub const MAX_NAME_LENGTH: usize = 100;
    pub const MAX_DESCRIPTION_LENGTH: usize = 500;
    pub const MAX_LINK_LENGTH: usize = 256;
    pub const MAX_LANGUAGE_LENGTH: usize = 10;
    pub const MAX_CATEGORY_LENGTH: usize = 100;
    pub const MAX_IMAGE_URL_LENGTH: usize = 256;
    pub const MAX_EPISODES: usize = 100;
    pub const MAX_SIZE: usize = 8 + 32 +
                                4 + Self::MAX_NAME_LENGTH +
                                4 + Self::MAX_DESCRIPTION_LENGTH +
                                4 + Self::MAX_LINK_LENGTH +
                                4 + Self::MAX_LANGUAGE_LENGTH +
                                4 + Self::MAX_CATEGORY_LENGTH +
                                4 + Self::MAX_IMAGE_URL_LENGTH +
                                1 +
                                4 + (Episode::MAX_SIZE * Self::MAX_EPISODES) +
                                1;
}