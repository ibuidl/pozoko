/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/zoku.json`.
 */
export type Zoku = {
  "address": "coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF",
  "metadata": {
    "name": "zoku",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "channelSubscribe",
      "discriminator": [
        176,
        128,
        121,
        223,
        137,
        193,
        111,
        82
      ],
      "accounts": [
        {
          "name": "channelMintAccount",
          "writable": true
        },
        {
          "name": "creatorAta",
          "writable": true
        },
        {
          "name": "listenerAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "listener"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "channelMintAccount"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "nftManager",
          "docs": [
            "It is validated through seeds and bump, and its ownership is checked.",
            "The PDA is derived using the seeds and bump, ensuring it is the correct account."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  102,
                  116,
                  95,
                  109,
                  97,
                  110,
                  97,
                  103,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "channelMintAccount"
              }
            ]
          }
        },
        {
          "name": "listener",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenMetadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        }
      ],
      "args": []
    },
    {
      "name": "close",
      "discriminator": [
        98,
        165,
        201,
        177,
        108,
        65,
        206,
        96
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "zoku",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "createChannel",
      "discriminator": [
        37,
        105,
        253,
        99,
        87,
        46,
        223,
        20
      ],
      "accounts": [
        {
          "name": "profileAccount",
          "writable": true
        },
        {
          "name": "channelInfoAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  104,
                  97,
                  110,
                  110,
                  101,
                  108,
                  95,
                  118,
                  49
                ]
              },
              {
                "kind": "arg",
                "path": "args.channel_title"
              },
              {
                "kind": "arg",
                "path": "args.channel_create_at"
              },
              {
                "kind": "account",
                "path": "profileAccount"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "channelArgs"
            }
          }
        }
      ]
    },
    {
      "name": "createProfile",
      "discriminator": [
        225,
        205,
        234,
        143,
        17,
        186,
        50,
        220
      ],
      "accounts": [
        {
          "name": "profileAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "profileArgs"
            }
          }
        }
      ]
    },
    {
      "name": "decrement",
      "discriminator": [
        106,
        227,
        168,
        59,
        248,
        27,
        150,
        101
      ],
      "accounts": [
        {
          "name": "zoku",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "increment",
      "discriminator": [
        11,
        18,
        104,
        9,
        104,
        174,
        59,
        33
      ],
      "accounts": [
        {
          "name": "zoku",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "zoku",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "publishEpisode",
      "discriminator": [
        134,
        57,
        21,
        61,
        92,
        30,
        33,
        238
      ],
      "accounts": [
        {
          "name": "channelInfoAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  104,
                  97,
                  110,
                  110,
                  101,
                  108,
                  95,
                  118,
                  49
                ]
              },
              {
                "kind": "arg",
                "path": "args.channel_title"
              },
              {
                "kind": "arg",
                "path": "args.channel_create_at"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "episodeArgs"
            }
          }
        }
      ]
    },
    {
      "name": "releaseChannelNft",
      "discriminator": [
        6,
        253,
        192,
        162,
        171,
        249,
        165,
        76
      ],
      "accounts": [
        {
          "name": "channelMintAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  104,
                  97,
                  110,
                  110,
                  101,
                  108,
                  95,
                  118,
                  49
                ]
              },
              {
                "kind": "account",
                "path": "channelInfoAccount"
              }
            ]
          }
        },
        {
          "name": "stakePoolAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  112,
                  111,
                  111,
                  108,
                  95,
                  118,
                  49
                ]
              },
              {
                "kind": "account",
                "path": "channelMintAccount"
              }
            ]
          }
        },
        {
          "name": "programReceiptNftAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "stakePoolAccount"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "channelMintAccount"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "nftManager",
          "docs": [
            "It is validated through seeds and bump, and its ownership is checked.",
            "The PDA is derived using the seeds and bump, ensuring it is the correct account."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  102,
                  116,
                  95,
                  109,
                  97,
                  110,
                  97,
                  103,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "channelMintAccount"
              }
            ]
          }
        },
        {
          "name": "masterEditionAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "tokenMetadataProgram"
              },
              {
                "kind": "account",
                "path": "channelMintAccount"
              },
              {
                "kind": "const",
                "value": [
                  101,
                  100,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              }
            ],
            "program": {
              "kind": "account",
              "path": "tokenMetadataProgram"
            }
          }
        },
        {
          "name": "metadataAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "tokenMetadataProgram"
              },
              {
                "kind": "account",
                "path": "channelMintAccount"
              }
            ],
            "program": {
              "kind": "account",
              "path": "tokenMetadataProgram"
            }
          }
        },
        {
          "name": "channelInfoAccount",
          "writable": true
        },
        {
          "name": "creatorAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "authority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "channelMintAccount"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenMetadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "channelArgs"
            }
          }
        }
      ]
    },
    {
      "name": "set",
      "discriminator": [
        198,
        51,
        53,
        241,
        116,
        29,
        126,
        194
      ],
      "accounts": [
        {
          "name": "zoku",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "value",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "channelInfo",
      "discriminator": [
        146,
        113,
        106,
        43,
        179,
        176,
        35,
        241
      ]
    },
    {
      "name": "profileInfo",
      "discriminator": [
        255,
        38,
        155,
        69,
        208,
        33,
        72,
        247
      ]
    },
    {
      "name": "stakePool",
      "discriminator": [
        121,
        34,
        206,
        21,
        79,
        127,
        255,
        28
      ]
    },
    {
      "name": "zoku",
      "discriminator": [
        204,
        108,
        254,
        39,
        86,
        117,
        246,
        171
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "noEnoughBalance",
      "msg": "Create fail! There isn't enough solana. The minimum required is 0.03 sol!"
    },
    {
      "code": 6001,
      "name": "noChannel",
      "msg": "Subscribe fail! This channel doesn't exist!"
    },
    {
      "code": 6002,
      "name": "metadataAccountNotInitialized",
      "msg": "Metadata account not initialized."
    },
    {
      "code": 6003,
      "name": "masterEditionAccountNotInitialized",
      "msg": "Master edition account not initialized."
    },
    {
      "code": 6004,
      "name": "noPayEnoughSol",
      "msg": "Please pay the full amount of solana."
    },
    {
      "code": 6005,
      "name": "noNft",
      "msg": "The staker does not have enough NFTs."
    },
    {
      "code": 6006,
      "name": "noStake",
      "msg": "No stake NFTs."
    }
  ],
  "types": [
    {
      "name": "channelArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "channelTitle",
            "type": "string"
          },
          {
            "name": "image",
            "type": "string"
          },
          {
            "name": "channelSubType",
            "type": "i32"
          },
          {
            "name": "channelType",
            "type": "i32"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "channelCreateAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "channelInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "image",
            "type": "string"
          },
          {
            "name": "channelSubType",
            "type": "i32"
          },
          {
            "name": "channelType",
            "type": "i32"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "follow",
            "type": "i64"
          },
          {
            "name": "createAt",
            "type": "u64"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "episodeCount",
            "type": "u64"
          },
          {
            "name": "lastUpdate",
            "type": "u64"
          },
          {
            "name": "episodeList",
            "type": {
              "vec": {
                "defined": {
                  "name": "episodeInfo"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "episodeArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "channelTitle",
            "type": "string"
          },
          {
            "name": "channelCreateAt",
            "type": "u64"
          },
          {
            "name": "episodeCreateAt",
            "type": "u64"
          },
          {
            "name": "episodeTitle",
            "type": "string"
          },
          {
            "name": "imageCid",
            "type": "string"
          },
          {
            "name": "cid",
            "type": "string"
          },
          {
            "name": "descripe",
            "type": "string"
          },
          {
            "name": "playType",
            "type": "u8"
          },
          {
            "name": "visibleRange",
            "type": "u8"
          },
          {
            "name": "publishAtType",
            "type": "u8"
          },
          {
            "name": "platform",
            "type": "bytes"
          },
          {
            "name": "isPublish",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "episodeInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "publishAt",
            "type": "u64"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "imageCid",
            "type": "string"
          },
          {
            "name": "cid",
            "type": "string"
          },
          {
            "name": "income",
            "type": "u64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "descripe",
            "type": "string"
          },
          {
            "name": "playType",
            "type": "u8"
          },
          {
            "name": "visibleRange",
            "type": "u8"
          },
          {
            "name": "publishAtType",
            "type": "u8"
          },
          {
            "name": "platform",
            "type": "bytes"
          },
          {
            "name": "isPublish",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "profileArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profilePicture",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "websiteUrl",
            "type": "string"
          },
          {
            "name": "bio",
            "type": "string"
          },
          {
            "name": "emil",
            "type": "string"
          },
          {
            "name": "xUrl",
            "type": "string"
          },
          {
            "name": "wrapcastUrl",
            "type": "string"
          },
          {
            "name": "magicEdenUrl",
            "type": "string"
          },
          {
            "name": "leamsUrl",
            "type": "string"
          },
          {
            "name": "discordUrl",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "profileInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profilePicture",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "websiteUrl",
            "type": "string"
          },
          {
            "name": "bio",
            "type": "string"
          },
          {
            "name": "emil",
            "type": "string"
          },
          {
            "name": "xUrl",
            "type": "string"
          },
          {
            "name": "wrapcastUrl",
            "type": "string"
          },
          {
            "name": "magicEdenUrl",
            "type": "string"
          },
          {
            "name": "leamsUrl",
            "type": "string"
          },
          {
            "name": "discordUrl",
            "type": "string"
          },
          {
            "name": "channelCount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "stakeInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "staker",
            "type": "pubkey"
          },
          {
            "name": "nftMintAccount",
            "type": "pubkey"
          },
          {
            "name": "stakedAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "stakePool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stakeCount",
            "type": "u64"
          },
          {
            "name": "nftMintAccount",
            "type": "pubkey"
          },
          {
            "name": "stakeList",
            "type": {
              "vec": {
                "defined": {
                  "name": "stakeInfo"
                }
              }
            }
          },
          {
            "name": "stakedPoolAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "zoku",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "count",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
