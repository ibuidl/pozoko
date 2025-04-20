use anchor_lang::prelude::*;


#[account]
pub struct EpisodeInfo{

    //频道中的序号
    pub order: i32,

    //单元名称
    pub title: String,

    //单元图片
    pub image: String,

    //音频链接地址
    pub url: String,
}