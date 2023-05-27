// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract JournalContract {
    event JournalSubmitted(
        uint256 indexed journalId,
        address indexed author,
        string title
    );

    event JournalRevision(
        uint256 indexed journalId,
        address indexed author,
        string title
    );

    event JournalReviewed(
        uint256 indexed journalId,
        address indexed reviewer,
        int8 score,
        string comment
    );

    event JournalPublished(
        uint256 indexed journalId,
        address indexed editor,
        string title
    );

    event JournalDenied(
        uint256 indexed journalId,
        address indexed editor,
        string title
    );

    struct Journal {
        uint256 journalId;
        string title;
        string description;
        string[] keywords;
        string ipfsLink;
        address author;
        bool published;
        bool denied;
    }

    struct ReviewData {
        address[] reviewers;
        address editor;
        mapping(address => int8) scores;
        mapping(address => string) comments;
    }

    struct ReviewDataDisplay {
        address reviewer;
        int8 score;
        string comment;
    }

    mapping(uint256 => Journal) public _journals;
    mapping(uint256 => ReviewData) public _reviewsData;

    uint256 journalsCounter = 0;

    function submitJournal(
        string memory _title,
        string memory _description,
        string memory ipfsLink,
        string[] memory _keywords,
        address[] memory _reviewers,
        address _editor
    ) public {
        require(
            !_journalExists(_title),
            "Journal with the same name already exists"
        );

        uint256 journalId = journalsCounter;
        journalsCounter++;

        Journal storage journal = _journals[journalId];
        journal.journalId = journalId;
        journal.title = _title;
        journal.description = _description;
        journal.keywords = _keywords;
        journal.author = msg.sender;
        journal.ipfsLink = ipfsLink;
        journal.published = false;
        journal.denied = false;

        ReviewData storage reviewData = _reviewsData[journalId];
        reviewData.reviewers = _reviewers;
        reviewData.editor = _editor;

        emit JournalSubmitted(journalId, msg.sender, _title);
    }

    function journalRevision(
        uint256 journalId,
        string memory _ipfsLink
    ) public {
        require(journalId < journalsCounter, "Journal does not exist");

        Journal storage journal = _journals[journalId];

        require(
            msg.sender == journal.author,
            "Only author can perform this action"
        );

        require(
            journal.denied,
            "Journal must be denied by editor in order to revise it"
        );

        journal.denied = false;
        journal.ipfsLink = _ipfsLink;

        emit JournalRevision(journalId, msg.sender, journal.title);
    }

    function editorReview(uint256 journalId, bool approve) public {
        require(_exists(journalId), "Journal does not exist");

        Journal storage journal = _journals[journalId];
        ReviewData storage reviewData = _reviewsData[journalId];

        require(msg.sender == reviewData.editor, "Only editor can publish");
        require(!journal.published, "Journal already published");

        require(
            _allReviewersVoted(journalId),
            "All reviewers must vote before editor can review journal"
        );

        if (approve) {
            journal.published = true;
            journal.denied = false;

            emit JournalPublished(journalId, msg.sender, journal.title);
        } else {
            journal.denied = true;

            for (uint256 i = 0; i < reviewData.reviewers.length; i++) {
                delete reviewData.scores[reviewData.reviewers[i]];
            }

            for (uint256 i = 0; i < reviewData.reviewers.length; i++) {
                delete reviewData.comments[reviewData.reviewers[i]];
            }

            emit JournalDenied(journalId, msg.sender, journal.title);
        }
    }

    function getJournal(uint256 journalId) public view returns (Journal memory) {
        require(_exists(journalId), "Journal does not exist");
        Journal storage journal = _journals[journalId];
        return journal;
    }

    function reviewJournal(
        uint256 journalId,
        int8 score,
        string memory comment
    ) public {
        require(_exists(journalId), "Journal does not exist");
        require(
            _isCallerReviewer(journalId),
            "Caller is not assigned as reviewer on journal"
        );

        ReviewData storage reviewData = _reviewsData[journalId];

        require(
            reviewData.scores[msg.sender] == 0,
            "Vote from reviewer already given"
        );
        require(score == 1 || score == -1, "Score can only be -1 or 1");

        reviewData.scores[msg.sender] = score;
        reviewData.comments[msg.sender] = comment;

        emit JournalReviewed(journalId, msg.sender, score, comment);
    }

    function getAllReviewingJournals() public view returns (Journal[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < journalsCounter; i++) {
            if (!_journals[i].published) {
                count++;
            }
        }

        Journal[] memory unpublishedJournals = new Journal[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < journalsCounter; i++) {
            if (!_journals[i].published) {
                unpublishedJournals[index] = _journals[i];
                index++;
            }
        }

        return unpublishedJournals;
    }

    function getPublishedJournals() public view returns (Journal[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < journalsCounter; i++) {
            if (_journals[i].published) {
                count++;
            }
        }

        Journal[] memory publishedJournals = new Journal[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < journalsCounter; i++) {
            if (_journals[i].published) {
                publishedJournals[index] = _journals[i];
                index++;
            }
        }

        return publishedJournals;
    }

    function getReviewData(
        uint256 journalId
    ) public view returns (address editor, ReviewDataDisplay[] memory) {
        require(_exists(journalId), "Review data for journalId does not exist");

        ReviewData storage reviewData = _reviewsData[journalId];

        uint256 count = reviewData.reviewers.length;
        ReviewDataDisplay[] memory reviewDataDisplay = new ReviewDataDisplay[](
            count
        );

        for (uint256 i = 0; i < count; i++) {
            address reviewer = reviewData.reviewers[i];

            reviewDataDisplay[i] = ReviewDataDisplay({
            reviewer: reviewer,
            score: reviewData.scores[reviewer],
            comment: reviewData.comments[reviewer]
            });
        }

        return (reviewData.editor, reviewDataDisplay);
    }

    function getJournalsByAuthor(
        address author
    ) public view returns (Journal[] memory) {
        uint256 count = 0;

        for (uint256 i = 0; i < journalsCounter; i++) {
            if (_journals[i].author == author) {
                count++;
            }
        }

        Journal[] memory authorJournals = new Journal[](count);

        uint256 currentIndex = 0;
        for (uint256 i = 0; i < journalsCounter; i++) {
            if (_journals[i].author == author) {
                authorJournals[currentIndex] = _journals[i];
                currentIndex++;
            }
        }

        return authorJournals;
    }

    function getJournalsByReviewer(
        address reviewer
    ) public view returns (Journal[] memory) {
        uint256 count = 0;

        for (uint256 i = 0; i < journalsCounter; i++) {
            if (_isReviewer(i, reviewer)) {
                count++;
            }
        }

        Journal[] memory reviewerJournals = new Journal[](count);

        uint256 currentIndex = 0;
        for (uint256 i = 0; i < journalsCounter; i++) {
            if (_isReviewer(i, reviewer)) {
                reviewerJournals[currentIndex] = _journals[i];
                currentIndex++;
            }
        }

        return reviewerJournals;
    }

    function getJournalsByEditor(
        address editor
    ) public view returns (Journal[] memory) {
        uint256 count = 0;

        for (uint256 i = 0; i < journalsCounter; i++) {
            if (_reviewsData[i].editor == editor) {
                count++;
            }
        }

        Journal[] memory editorJournals = new Journal[](count);

        uint256 currentIndex = 0;
        for (uint256 i = 0; i < journalsCounter; i++) {
            if (_reviewsData[i].editor == editor) {
                editorJournals[currentIndex] = _journals[i];
                currentIndex++;
            }
        }

        return editorJournals;
    }

    function _journalExists(string memory title) internal view returns (bool) {
        for (uint256 i = 0; i < journalsCounter; i++) {
            if (
                keccak256(bytes(_journals[i].title)) == keccak256(bytes(title))
            ) {
                return true;
            }
        }
        return false;
    }

    function _exists(uint256 journalId) internal view returns (bool) {
        return (_journals[journalId].author != address(0));
    }

    function _isCallerReviewer(uint256 journalId) internal view returns (bool) {
        ReviewData storage reviewData = _reviewsData[journalId];
        address[] storage reviewers = reviewData.reviewers;

        for (uint256 i = 0; i < reviewers.length; i++) {
            if (reviewers[i] == msg.sender) {
                return true;
            }
        }

        return false;
    }

    function _isReviewer(
        uint256 journalId,
        address reviewer
    ) internal view returns (bool) {
        ReviewData storage reviewData = _reviewsData[journalId];
        address[] storage reviewers = reviewData.reviewers;

        for (uint256 i = 0; i < reviewers.length; i++) {
            if (reviewers[i] == reviewer) {
                return true;
            }
        }

        return false;
    }

    function _allReviewersVoted(uint256 journalId) public view returns (bool) {
        ReviewData storage review = _reviewsData[journalId];

        for (uint256 i = 0; i < review.reviewers.length; i++) {
            if (review.scores[msg.sender] != 0) {
                return false;
            }
        }

        return true;
    }
}
