/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/zoku.json`.
 */
export type Zoku = {
  address: '3y53pS9zx5fLA6sSVsiwYJMot9FgEE1g9s8UnywjnU9s';
  metadata: {
    name: 'zoku';
    version: '0.1.0';
    spec: '0.1.0';
    description: 'Created with Anchor';
  };
  instructions: [
    {
      name: 'channelNftCreate';
      discriminator: [239, 115, 168, 244, 15, 249, 118, 90];
      accounts: [
        {
          name: 'channelInfo';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
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
                  49,
                ];
              },
              {
                kind: 'account';
                path: 'channelMintAccount';
              },
            ];
          };
        },
        {
          name: 'metadataAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [109, 101, 116, 97, 100, 97, 116, 97];
              },
              {
                kind: 'account';
                path: 'tokenMetadataProgram';
              },
              {
                kind: 'account';
                path: 'channelMintAccount';
              },
            ];
            program: {
              kind: 'account';
              path: 'tokenMetadataProgram';
            };
          };
        },
        {
          name: 'channelMintAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
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
                  49,
                ];
              },
              {
                kind: 'arg';
                path: 'args.symbol';
              },
            ];
          };
        },
        {
          name: 'rent';
          address: 'SysvarRent111111111111111111111111111111111';
        },
        {
          name: 'owner';
          writable: true;
          signer: true;
        },
        {
          name: 'tokenMetadataProgram';
          address: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
      ];
      args: [
        {
          name: 'args';
          type: {
            defined: {
              name: 'channelNftArgs';
            };
          };
        },
      ];
    },
    {
      name: 'channelNftMint';
      discriminator: [109, 181, 44, 192, 242, 179, 152, 2];
      accounts: [
        {
          name: 'channelInfo';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
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
                  49,
                ];
              },
              {
                kind: 'account';
                path: 'channelMintAccount';
              },
            ];
          };
        },
        {
          name: 'channelMintAccount';
          writable: true;
        },
        {
          name: 'channelNftAta';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'account';
                path: 'creator';
              },
              {
                kind: 'const';
                value: [
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
                  169,
                ];
              },
              {
                kind: 'account';
                path: 'channelMintAccount';
              },
            ];
            program: {
              kind: 'const';
              value: [
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
                89,
              ];
            };
          };
        },
        {
          name: 'creator';
          writable: true;
          signer: true;
        },
        {
          name: 'tokenProgram';
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
        },
        {
          name: 'associatedTokenProgram';
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        },
      ];
    },
    {
      name: 'close';
      discriminator: [98, 165, 201, 177, 108, 65, 206, 96];
      accounts: [
        {
          name: 'payer';
          writable: true;
          signer: true;
        },
        {
          name: 'zoku';
          writable: true;
        },
      ];
      args: [];
    },
    {
      name: 'decrement';
      discriminator: [106, 227, 168, 59, 248, 27, 150, 101];
      accounts: [
        {
          name: 'zoku';
          writable: true;
        },
      ];
      args: [];
    },
    {
      name: 'increment';
      discriminator: [11, 18, 104, 9, 104, 174, 59, 33];
      accounts: [
        {
          name: 'zoku';
          writable: true;
        },
      ];
      args: [];
    },
    {
      name: 'initialize';
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: 'payer';
          writable: true;
          signer: true;
        },
        {
          name: 'zoku';
          writable: true;
          signer: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
      ];
      args: [];
    },
    {
      name: 'initializeCreator';
      discriminator: [29, 153, 44, 99, 52, 172, 81, 115];
      accounts: [
        {
          name: 'creatorAccount';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [
                  99,
                  114,
                  101,
                  97,
                  116,
                  111,
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
                  49,
                ];
              },
              {
                kind: 'account';
                path: 'owner';
              },
            ];
          };
        },
        {
          name: 'owner';
          writable: true;
          signer: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
      ];
      args: [
        {
          name: 'nickname';
          type: 'string';
        },
        {
          name: 'avatar';
          type: 'string';
        },
      ];
    },
    {
      name: 'set';
      discriminator: [198, 51, 53, 241, 116, 29, 126, 194];
      accounts: [
        {
          name: 'zoku';
          writable: true;
        },
      ];
      args: [
        {
          name: 'value';
          type: 'u8';
        },
      ];
    },
  ];
  accounts: [
    {
      name: 'channelInfo';
      discriminator: [146, 113, 106, 43, 179, 176, 35, 241];
    },
    {
      name: 'creatorAccount';
      discriminator: [222, 163, 32, 169, 204, 8, 200, 32];
    },
    {
      name: 'zoku';
      discriminator: [204, 108, 254, 39, 86, 117, 246, 171];
    },
  ];
  events: [
    {
      name: 'channelEtfCreateEvent';
      discriminator: [6, 193, 185, 58, 61, 234, 121, 154];
    },
    {
      name: 'channelNftMintEvent';
      discriminator: [118, 151, 211, 238, 99, 87, 172, 101];
    },
    {
      name: 'userInitialized';
      discriminator: [66, 195, 5, 223, 42, 84, 135, 60];
    },
  ];
  errors: [
    {
      code: 6000;
      name: 'invalidCreatorShare';
      msg: 'The total creator share must be 100.';
    },
    {
      code: 6001;
      name: 'mathOverflow';
      msg: 'Math operation overflowed';
    },
    {
      code: 6002;
      name: 'invalidAmount';
      msg: 'Invalid amount';
    },
  ];
  types: [
    {
      name: 'channelEtfCreateEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'channelEtfMint';
            type: 'pubkey';
          },
          {
            name: 'creators';
            type: {
              vec: {
                defined: {
                  name: 'creator';
                };
              };
            };
          },
        ];
      };
    },
    {
      name: 'channelInfo';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'mintAccount';
            type: 'pubkey';
          },
          {
            name: 'mintNum';
            type: 'u64';
          },
          {
            name: 'isEnabled';
            type: 'bool';
          },
          {
            name: 'like';
            type: 'u64';
          },
          {
            name: 'numOfSubscribers';
            type: 'u64';
          },
          {
            name: 'numOfAudios';
            type: 'u64';
          },
          {
            name: 'createdAt';
            type: 'i64';
          },
          {
            name: 'typeOfCost';
            type: {
              defined: {
                name: 'typeOfCost';
              };
            };
          },
          {
            name: 'description';
            type: 'string';
          },
          {
            name: 'creators';
            type: {
              vec: {
                defined: {
                  name: 'creator';
                };
              };
            };
          },
          {
            name: 'ipfsHash';
            type: 'string';
          },
        ];
      };
    },
    {
      name: 'channelNftArgs';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'name';
            type: 'string';
          },
          {
            name: 'symbol';
            type: 'string';
          },
          {
            name: 'url';
            type: 'string';
          },
          {
            name: 'description';
            type: 'string';
          },
          {
            name: 'creators';
            type: {
              vec: {
                defined: {
                  name: 'creator';
                };
              };
            };
          },
          {
            name: 'ipfsHash';
            type: 'string';
          },
          {
            name: 'isEnabled';
            type: 'bool';
          },
          {
            name: 'typeOfCost';
            type: {
              defined: {
                name: 'typeOfCost';
              };
            };
          },
          {
            name: 'sellerFeeBasisPoints';
            type: 'u16';
          },
        ];
      };
    },
    {
      name: 'channelNftMintEvent';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'channelNftMint';
            type: 'pubkey';
          },
          {
            name: 'creator';
            type: 'pubkey';
          },
          {
            name: 'amount';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'creator';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'address';
            type: 'pubkey';
          },
          {
            name: 'share';
            type: 'u8';
          },
          {
            name: 'verified';
            type: 'bool';
          },
        ];
      };
    },
    {
      name: 'creatorAccount';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'owner';
            type: 'pubkey';
          },
          {
            name: 'isFrozen';
            type: 'bool';
          },
          {
            name: 'createdAt';
            type: 'i64';
          },
          {
            name: 'totalViewers';
            type: 'u64';
          },
          {
            name: 'nickname';
            type: 'string';
          },
          {
            name: 'avatar';
            type: 'string';
          },
          {
            name: 'padding';
            type: {
              array: ['u64', 10];
            };
          },
        ];
      };
    },
    {
      name: 'typeOfCost';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'free';
          },
          {
            name: 'paid';
          },
        ];
      };
    },
    {
      name: 'userInitialized';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'creator';
            type: 'pubkey';
          },
          {
            name: 'nickname';
            type: 'string';
          },
          {
            name: 'createdAt';
            type: 'i64';
          },
        ];
      };
    },
    {
      name: 'zoku';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'count';
            type: 'u8';
          },
        ];
      };
    },
  ];
};
