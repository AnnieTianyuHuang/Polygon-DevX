# Pinnect
Game-map collaboration, all for gammers.
![Pinnect.001.jpeg](/images/Pinnect.001.jpeg)
## Core Features Built with Eluvio
![Pinnect.002.jpeg](/images/Pinnect.002.jpeg)
**Eluvio Content Fabric - Tokenization**
- Converts content into digital assets, including both fungible and non-fungible tokens (NFTs). Transforms story cards created on the map into NFTs.
**Utilize the Eluvio Media Wallet**
- Creators use the Media Wallet when logging into Pinnect.
**Story of the Day**
- feature called "Story of the Day" where users on Pinnect can submit and view a featured story each day. This story gets tokenized using Eluvio and showcased in a special section. Each day, a new story is selected, tokenized, and featured. The integration with Eluvio ensures secure and verifiable content management, while the use of the Media Wallet can authenticate submissions and access.

![PInnectSynergy](/images/synergy.jpeg)
## Story of the day!
Recommend daily story for user which fits their preference the most
![PInnectSynergy](/images/story-of-the-day.jpeg)
**The AI framework support for the Pinnect platform is enhanced by** **MindsDB**
- Personalized Recommendation Engine: By integrating the new AI framework with MindsDB, a more accurate recommendation system is built to suggest stories or games that users may be interested in.
**Vectara** **Content Recommendation Engine**
- Application scenario: Use Vectara to provide personalized content recommendations for Pinnect users.
- Implementation method: Analyze user behavior and preferences, and combine with Vectara to generate relevant article or post recommendations.

## Game-map Collaboration
This page allows you to control the display of the map and its tags through filtering, sorting, and other methods to find the information you need.
![Pinnect.003.jpeg](/images/Pinnect.003.jpeg)
Priority of feature requirements: Understandable but not obvious method
1. Tag List: Display an evenly arranged list of all primary tags and their associated secondary tags. Clicking on any will dim it and no longer display its corresponding tag on the map. Clicking a primary tag will hide all the markers corresponding to its secondary tags.
2. Show/Hide All Switch: This switch controls the visibility of all tags.
3. Search Box: This allows for searching for specific tags or markers.
4. Progress Radio Button: By selecting different chapters (game progress), you can choose different degrees of war fog coverage to prevent spoilers. For example, when selecting the first chapter, markers in the tag data that belong to the second chapter and later will be hidden.
5. Heatmap Display Mode Switch: You can select "Heatmap Priority" to display the markers most frequently visited/submitted by current players. This is useful for viewing the progress of the majority of players.
6. Mini-map and Zoom Buttons: Includes a thumbnail of the map and zoom in/out buttons.

## Tag Editing
Editing interface for tags.
![Pinnect.004.jpeg](/images/Pinnect.004.jpeg)

The layout, from top to bottom, is as follows:
- Image and its submission button. (Optional)
- Title and its text input box.
- Description and its text input box. (Optional)
- Dropdown single selection box for primary tags.
  This can be tasks, NPCs, items, buildings, regions, or any other types.
- Dropdown single selection box for secondary tags. (Optional)
  Only two levels of tags are set.
- Belonging chapter. (Optional)
- Submission button.

### Function
1. In the description input box, hyperlinks to other tags can be created using [[]] syntax.
2. Transaction bundling: every 'n' transactions should be bundled together for on-chain attestation (this number 'n' needs to be set).
3. AI duplication detection: when a user makes a submission, the content is analyzed to determine if it is a tag that already exists. If it is, a prompt should appear asking if this is a mistake, with two options: 'Yes, submit an updated version' or 'No, submit as a new version'. If 'No' is chosen, the submission should undergo backend review.

## Relationship Flow
Relationship diagram of the current tag is highlighted. When another tag is clicked, a line between the current tag and the clicked tag is displayed, along with an adjacent edit box.
![Pinnect.005.jpeg](/images/Pinnect.005.jpeg)

The layout of the edit box, from top to bottom, is as follows:
1. Direction and its option box: There are two types, preceding and following, similar to the arrowhead editing box at the end of the line in Keynote.
2. Relationship and its option box: This can be connectors like "owns", "manages", "belongs to", "requires", etc.

## Connect Wallet with cross-platform support
Contribute on-chain for fair incentive and collaboration
![Pinnect.006.jpeg](/images/Pinnect.006.jpeg)
![Pinnect.007.jpeg](/images/Pinnect.007.jpeg)

## Developers
**Annie Huang**
CS + Business Sophomore @ UC Berkeley, ETH Denver NFT Track Award Winner, Canada National Book Award Winner, NCWIT Award Winner.
