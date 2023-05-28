export const journalContract = {
    contractAdress: "0x213Db790d7541316aD722e7AD0e3a0226e724525",
    abi: [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "journalId",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "editor",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "title",
            "type": "string"
          }
        ],
        "name": "JournalDenied",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "journalId",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "editor",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "title",
            "type": "string"
          }
        ],
        "name": "JournalPublished",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "journalId",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "reviewer",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "int8",
            "name": "score",
            "type": "int8"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "comment",
            "type": "string"
          }
        ],
        "name": "JournalReviewed",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "journalId",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "author",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "title",
            "type": "string"
          }
        ],
        "name": "JournalRevision",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "journalId",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "author",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "title",
            "type": "string"
          }
        ],
        "name": "JournalSubmitted",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "journalId",
            "type": "uint256"
          }
        ],
        "name": "_allReviewersVoted",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "_journals",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "journalId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "ipfsLink",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "author",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "published",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "denied",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "_reviewsData",
        "outputs": [
          {
            "internalType": "address",
            "name": "editor",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "journalId",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "approve",
            "type": "bool"
          }
        ],
        "name": "editorReview",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getAllReviewingJournals",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "journalId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "string[]",
                "name": "keywords",
                "type": "string[]"
              },
              {
                "internalType": "string",
                "name": "ipfsLink",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "author",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "published",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "denied",
                "type": "bool"
              }
            ],
            "internalType": "struct JournalContract.Journal[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "journalId",
            "type": "uint256"
          }
        ],
        "name": "getJournal",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "journalId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "string[]",
                "name": "keywords",
                "type": "string[]"
              },
              {
                "internalType": "string",
                "name": "ipfsLink",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "author",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "published",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "denied",
                "type": "bool"
              }
            ],
            "internalType": "struct JournalContract.Journal",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "author",
            "type": "address"
          }
        ],
        "name": "getJournalsByAuthor",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "journalId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "string[]",
                "name": "keywords",
                "type": "string[]"
              },
              {
                "internalType": "string",
                "name": "ipfsLink",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "author",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "published",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "denied",
                "type": "bool"
              }
            ],
            "internalType": "struct JournalContract.Journal[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "editor",
            "type": "address"
          }
        ],
        "name": "getJournalsByEditor",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "journalId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "string[]",
                "name": "keywords",
                "type": "string[]"
              },
              {
                "internalType": "string",
                "name": "ipfsLink",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "author",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "published",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "denied",
                "type": "bool"
              }
            ],
            "internalType": "struct JournalContract.Journal[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "reviewer",
            "type": "address"
          }
        ],
        "name": "getJournalsByReviewer",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "journalId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "string[]",
                "name": "keywords",
                "type": "string[]"
              },
              {
                "internalType": "string",
                "name": "ipfsLink",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "author",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "published",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "denied",
                "type": "bool"
              }
            ],
            "internalType": "struct JournalContract.Journal[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getPublishedJournals",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "journalId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "string[]",
                "name": "keywords",
                "type": "string[]"
              },
              {
                "internalType": "string",
                "name": "ipfsLink",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "author",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "published",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "denied",
                "type": "bool"
              }
            ],
            "internalType": "struct JournalContract.Journal[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "journalId",
            "type": "uint256"
          }
        ],
        "name": "getReviewData",
        "outputs": [
          {
            "internalType": "address",
            "name": "editor",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "reviewer",
                "type": "address"
              },
              {
                "internalType": "int8",
                "name": "score",
                "type": "int8"
              },
              {
                "internalType": "string",
                "name": "comment",
                "type": "string"
              }
            ],
            "internalType": "struct JournalContract.ReviewDataDisplay[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "journalId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_ipfsLink",
            "type": "string"
          }
        ],
        "name": "journalRevision",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "journalId",
            "type": "uint256"
          },
          {
            "internalType": "int8",
            "name": "score",
            "type": "int8"
          },
          {
            "internalType": "string",
            "name": "comment",
            "type": "string"
          }
        ],
        "name": "reviewJournal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "ipfsLink",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "_keywords",
            "type": "string[]"
          },
          {
            "internalType": "address[]",
            "name": "_reviewers",
            "type": "address[]"
          },
          {
            "internalType": "address",
            "name": "_editor",
            "type": "address"
          }
        ],
        "name": "submitJournal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
}
