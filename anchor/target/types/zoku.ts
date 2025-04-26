/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/zoku.json`.
 */
export type Zoku = {
  "address": "4B1ETA2cRMQfEpgnavcGbgxfcnUHtJVthtGqYC9Ndgqt",
  "metadata": {
    "name": "zoku",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createNft",
      "discriminator": [
        231,
        119,
        61,
        97,
        217,
        46,
        142,
        109
      ],
      "accounts": [
        {
          "name": "podcastAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  122,
                  111,
                  107,
                  117,
                  95,
                  112,
                  111,
                  100,
                  99,
                  97,
                  115,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "args.podcast_id"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "metadataAccount",
          "docs": [
            "CHECK"
          ],
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
                "path": "mintAccount"
              }
            ],
            "program": {
              "kind": "account",
              "path": "tokenMetadataProgram"
            }
          }
        },
        {
          "name": "mintAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  122,
                  111,
                  107,
                  117,
                  95,
                  110,
                  102,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "args.podcast_id"
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
        },
        {
          "name": "tokenMetadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
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
              "name": "createNftArgs"
            }
          }
        }
      ]
    },
    {
      "name": "mintNft",
      "discriminator": [
        211,
        57,
        6,
        167,
        15,
        219,
        35,
        251
      ],
      "accounts": [
        {
          "name": "mintAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  122,
                  111,
                  107,
                  117,
                  95,
                  110,
                  102,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "args.podcast_id"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "associatedTokenAccount",
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
                "path": "mintAccount"
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
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": {
              "name": "mintNftArgs"
            }
          }
        }
      ]
    },
    {
      "name": "upsertEpisode",
      "discriminator": [
        125,
        195,
        44,
        191,
        24,
        44,
        67,
        15
      ],
      "accounts": [
        {
          "name": "podcastAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  122,
                  111,
                  107,
                  117,
                  95,
                  112,
                  111,
                  100,
                  99,
                  97,
                  115,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "args.podcast_id"
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "episodeAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  122,
                  111,
                  107,
                  117,
                  95,
                  101,
                  112,
                  105,
                  115,
                  111,
                  100,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "args.podcast_id"
              },
              {
                "kind": "arg",
                "path": "args.episode_id"
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
              "name": "upsertEpisodeArgs"
            }
          }
        }
      ]
    },
    {
      "name": "upsertPodcast",
      "discriminator": [
        21,
        55,
        3,
        165,
        80,
        134,
        22,
        253
      ],
      "accounts": [
        {
          "name": "userAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  122,
                  111,
                  107,
                  117,
                  95,
                  117,
                  115,
                  101,
                  114
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
          "name": "podcastAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  122,
                  111,
                  107,
                  117,
                  95,
                  112,
                  111,
                  100,
                  99,
                  97,
                  115,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "args.podcast_id"
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
              "name": "upsertPodcastArgs"
            }
          }
        }
      ]
    },
    {
      "name": "upsertUser",
      "discriminator": [
        232,
        80,
        240,
        193,
        57,
        162,
        35,
        255
      ],
      "accounts": [
        {
          "name": "userAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  122,
                  111,
                  107,
                  117,
                  95,
                  117,
                  115,
                  101,
                  114
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
          "name": "metadataCid",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "episode",
      "discriminator": [
        41,
        175,
        64,
        71,
        108,
        169,
        208,
        47
      ]
    },
    {
      "name": "podcast",
      "discriminator": [
        4,
        15,
        13,
        115,
        213,
        212,
        162,
        71
      ]
    },
    {
      "name": "user",
      "discriminator": [
        159,
        117,
        95,
        227,
        239,
        151,
        58,
        236
      ]
    }
  ],
  "events": [
    {
      "name": "upsertEpisodeEvent",
      "discriminator": [
        234,
        157,
        246,
        161,
        100,
        78,
        19,
        130
      ]
    },
    {
      "name": "upsertPodcastEvent",
      "discriminator": [
        78,
        72,
        94,
        122,
        10,
        38,
        209,
        127
      ]
    },
    {
      "name": "upsertUserEvent",
      "discriminator": [
        52,
        109,
        165,
        65,
        142,
        251,
        153,
        69
      ]
    }
  ],
  "types": [
    {
      "name": "createNftArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "podcastId",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "episode",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "podcast",
            "type": "pubkey"
          },
          {
            "name": "author",
            "type": "pubkey"
          },
          {
            "name": "lastModify",
            "type": "i64"
          },
          {
            "name": "metadataCid",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "mintNftArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "podcastId",
            "type": "string"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "podcast",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "author",
            "type": "pubkey"
          },
          {
            "name": "lastModify",
            "type": "i64"
          },
          {
            "name": "episodeCount",
            "type": "u32"
          },
          {
            "name": "nftMintCount",
            "type": "u32"
          },
          {
            "name": "metadataCid",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "upsertEpisodeArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "metadataCid",
            "type": "string"
          },
          {
            "name": "podcastId",
            "type": "string"
          },
          {
            "name": "episodeId",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "upsertEpisodeEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "episode",
            "type": "pubkey"
          },
          {
            "name": "podcast",
            "type": "pubkey"
          },
          {
            "name": "author",
            "type": "pubkey"
          },
          {
            "name": "lastModify",
            "type": "i64"
          },
          {
            "name": "metadataCid",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "upsertPodcastArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "metadataCid",
            "type": "string"
          },
          {
            "name": "podcastId",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "upsertPodcastEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "podcast",
            "type": "pubkey"
          },
          {
            "name": "episodeCount",
            "type": "u32"
          },
          {
            "name": "nftMintCount",
            "type": "u32"
          },
          {
            "name": "lastModify",
            "type": "i64"
          },
          {
            "name": "metadataCid",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "upsertUserEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "podcastCount",
            "type": "u32"
          },
          {
            "name": "lastModify",
            "type": "i64"
          },
          {
            "name": "metadataCid",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lastModify",
            "type": "i64"
          },
          {
            "name": "podcastCount",
            "type": "u32"
          },
          {
            "name": "metadataCid",
            "type": "string"
          }
        ]
      }
    }
  ]
};
