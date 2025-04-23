use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Episode {
    pub title: String,
    pub audio_ipfs_cid: String,
    pub audio_url_fallback: String,
    pub publication_date: i64,
    pub description: String,
    pub duration: String,
    pub episode_guid: String,
    pub image_url: String,
    pub is_free: bool, // 新增属性：是否免费
}

impl Episode {
    pub const MAX_TITLE_LENGTH: usize = 200;
    pub const MAX_AUDIO_CID_LENGTH: usize = 256;
    pub const MAX_AUDIO_URL_FALLBACK_LENGTH: usize = 256;
    pub const MAX_DESCRIPTION_LENGTH: usize = 500;
    pub const MAX_DURATION_LENGTH: usize = 20;
    pub const MAX_EPISODE_GUID_LENGTH: usize = 256;
    pub const MAX_IMAGE_URL_LENGTH: usize = 256;
    pub const MAX_SIZE: usize = 4 + Self::MAX_TITLE_LENGTH +
                                4 + Self::MAX_AUDIO_CID_LENGTH +
                                4 + Self::MAX_AUDIO_URL_FALLBACK_LENGTH +
                                8 +
                                4 + Self::MAX_DESCRIPTION_LENGTH +
                                4 + Self::MAX_DURATION_LENGTH +
                                4 + Self::MAX_EPISODE_GUID_LENGTH +
                                4 + Self::MAX_IMAGE_URL_LENGTH +
                                1; // is_free (bool takes 1 byte)
}