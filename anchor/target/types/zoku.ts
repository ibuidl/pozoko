/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/zoku.json`.
 */
export type Zoku = {
  "address": "3Mxb3vnmPRcf8UCYSVaUrCc5VKV1P33EjMGuaJMuah4q",
  "metadata": {
    "name": "zoku",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "channelNftCreate",
      "discriminator": [
        239,
        115,
        168,
        244,
        15,
        249,
        118,
        90
      ],
      "accounts": [
        {
          "name": "channelInfo",
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
                  73,
                  110,
                  102,
                  111,
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
                  73,
                  110,
                  102,
                  111,
                  95,
                  118,
                  49
                ]
              },
              {
                "kind": "arg",
                "path": "args.symbol"
              }
            ]
          }
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenMetadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
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
              "name": "channelNftArgs"
            }
          }
        }
      ]
    },
    {
      "name": "channelNftMint",
      "discriminator": [
        109,
        181,
        44,
        192,
        242,
        179,
        152,
        2
      ],
      "accounts": [
        {
          "name": "channelInfo",
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
                  73,
                  110,
                  102,
                  111,
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
          "name": "channelMintAccount",
          "writable": true
        },
        {
          "name": "channelNftAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "creator"
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
          "name": "channelModelConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  104,
                  97,
                  110,
                  110,
                  101,
                  108,
                  77,
                  111,
                  100,
                  101,
                  108,
                  67,
                  111,
                  110,
                  102,
                  105,
                  103,
                  95,
                  118,
                  49
                ]
              },
              {
                "kind": "const",
                "value": [
                  35,
                  21,
                  215,
                  176,
                  224,
                  96,
                  93,
                  235,
                  71,
                  115,
                  146,
                  207,
                  178,
                  113,
                  108,
                  47,
                  237,
                  9,
                  39,
                  209,
                  112,
                  123,
                  47,
                  82,
                  108,
                  104,
                  184,
                  157,
                  223,
                  13,
                  244,
                  38
                ]
              }
            ]
          }
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
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
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u16"
        }
      ]
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
      "name": "createChannelModelConfig",
      "discriminator": [
        15,
        157,
        55,
        53,
        103,
        217,
        195,
        71
      ],
      "accounts": [
        {
          "name": "channelModelConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  104,
                  97,
                  110,
                  110,
                  101,
                  108,
                  77,
                  111,
                  100,
                  101,
                  108,
                  67,
                  111,
                  110,
                  102,
                  105,
                  103,
                  95,
                  118,
                  49
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              }
            ]
          }
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true,
          "address": "3Mxb3vnmPRcf8UCYSVaUrCc5VKV1P33EjMGuaJMuah4q"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "maxChannelNftMint",
          "type": "u16"
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
      "name": "initializeUser",
      "discriminator": [
        111,
        17,
        185,
        250,
        60,
        122,
        38,
        254
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
                  117,
                  115,
                  101,
                  114,
                  65,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116,
                  95,
                  118,
                  49
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
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
          "name": "nickname",
          "type": "string"
        },
        {
          "name": "avatar",
          "type": "string"
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
    },
    {
      "name": "updateEp",
      "discriminator": [
        144,
        193,
        119,
        155,
        125,
        56,
        250,
        239
      ],
      "accounts": [
        {
          "name": "channelInfo",
          "writable": true
        },
        {
          "name": "creator",
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
              "name": "episodeArgs"
            }
          }
        }
      ]
    },
    {
      "name": "updateUser",
      "discriminator": [
        9,
        2,
        160,
        169,
        118,
        12,
        207,
        84
      ],
      "accounts": [
        {
          "name": "userAccount",
          "writable": true
        },
        {
          "name": "owner",
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
          "name": "nickname",
          "type": "string"
        },
        {
          "name": "avatar",
          "type": "string"
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
      "name": "channelModelConfig",
      "discriminator": [
        101,
        76,
        120,
        212,
        63,
        25,
        150,
        232
      ]
    },
    {
      "name": "userAccount",
      "discriminator": [
        211,
        33,
        136,
        16,
        186,
        110,
        242,
        127
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
  "events": [
    {
      "name": "channelNftCreateEvent",
      "discriminator": [
        251,
        47,
        98,
        156,
        31,
        13,
        138,
        221
      ]
    },
    {
      "name": "channelNftMintEvent",
      "discriminator": [
        118,
        151,
        211,
        238,
        99,
        87,
        172,
        101
      ]
    },
    {
      "name": "episodeCreatedEvent",
      "discriminator": [
        80,
        62,
        7,
        30,
        107,
        29,
        208,
        31
      ]
    },
    {
      "name": "userInitialized",
      "discriminator": [
        66,
        195,
        5,
        223,
        42,
        84,
        135,
        60
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidCreatorShare",
      "msg": "The total creator share must be 100."
    },
    {
      "code": 6001,
      "name": "mathOverflow",
      "msg": "Math operation overflowed"
    },
    {
      "code": 6002,
      "name": "invalidAmount",
      "msg": "Invalid amount"
    },
    {
      "code": 6003,
      "name": "creatorsEmpty",
      "msg": "Creators Empty"
    },
    {
      "code": 6004,
      "name": "maxNftMintReached",
      "msg": "Maximum NFT mint amount reached"
    },
    {
      "code": 6005,
      "name": "invalidOwner",
      "msg": "Invalid owner"
    }
  ],
  "types": [
    {
      "name": "channelInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nftMintAccount",
            "type": "pubkey"
          },
          {
            "name": "nftMintAmount",
            "type": "u16"
          },
          {
            "name": "isEnabled",
            "type": "bool"
          },
          {
            "name": "numOfAudios",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "typeOfCost",
            "type": {
              "defined": {
                "name": "typeOfCost"
              }
            }
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
            "name": "description",
            "type": "string"
          },
          {
            "name": "creators",
            "type": {
              "vec": {
                "defined": {
                  "name": "creator"
                }
              }
            }
          },
          {
            "name": "avatar",
            "type": "string"
          },
          {
            "name": "episodes",
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
      "name": "channelModelConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxChannelNftMint",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "channelNftArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "url",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "creators",
            "type": {
              "vec": {
                "defined": {
                  "name": "creator"
                }
              }
            }
          },
          {
            "name": "avatar",
            "type": "string"
          },
          {
            "name": "isEnabled",
            "type": "bool"
          },
          {
            "name": "typeOfCost",
            "type": {
              "defined": {
                "name": "typeOfCost"
              }
            }
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "channelNftCreateEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "channelNftMint",
            "type": "pubkey"
          },
          {
            "name": "mainCreator",
            "type": {
              "defined": {
                "name": "creator"
              }
            }
          },
          {
            "name": "channelInfoAddress",
            "type": "pubkey"
          },
          {
            "name": "channelName",
            "type": "string"
          },
          {
            "name": "channelSymbol",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "channelNftMintEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "channelNftMint",
            "type": "pubkey"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "creator",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "pubkey"
          },
          {
            "name": "share",
            "type": "u8"
          },
          {
            "name": "verified",
            "type": "bool"
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
            "name": "isPublished",
            "type": "bool"
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
            "name": "metadataCid",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "episodeCreatedEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "episodeName",
            "type": "string"
          },
          {
            "name": "episodeSymbol",
            "type": "string"
          },
          {
            "name": "channel",
            "type": "pubkey"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "metadataCid",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "i64"
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
            "name": "channel",
            "type": "pubkey"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "isPublished",
            "type": "bool"
          },
          {
            "name": "rewards",
            "type": "u64"
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
            "name": "metadataCid",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "typeOfCost",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "free"
          },
          {
            "name": "paid"
          }
        ]
      }
    },
    {
      "name": "userAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "isFrozen",
            "type": "bool"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "nickname",
            "type": "string"
          },
          {
            "name": "avatar",
            "type": "string"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u64",
                10
              ]
            }
          }
        ]
      }
    },
    {
      "name": "userInitialized",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "nickname",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "owner",
            "type": "pubkey"
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
