### Timeline Plan

### Database Entities
---

- Calculated By Backend
  - Product
    - Product Average Star Rating - Number
    - Average Stars Rating By Each Star - Map
      ```
        {
          5: '',
          4: '',
          3: '',
          2: '',
          1: ''
        }
      ```
    - Average Sentiment Rate - Number
    - Unseen Reviews - Set - (FK)
    - Unseen Reviews - Set - (FK)
    - Total Reviews - Number

- User Entity
  - ID - UUID - (PK)
  - Federated ID - String
  - Pricing Plan - String
  - Last payment Date/Time - Number (UNIX TimeStamp)
  - Remaining Reviews - Number
  - User Created At - Date/Time
  - Is Unpaid - Boolean

- Product Entity
  - ID - UUID - (PK)
  - User UUID - (FK)
  - Title - String
  - Created Date/Time - Number (UNIX TimeStamp)

- Review Entity
  - ID - UUID - (PK)
  - Product ID - UUID - (FK)
  - User Federated ID - String
  - Title - String
  - Description - String
  - Star Rate - Number
  - Occupation - String
  - Sentiment Rate - Number
  - Submitted Date/Time - Number (UNIX TimeStamp) - (SK)
  - Last Edited Date/Time - Number (UNIX TimeStamp)
  - Automated Suggestions - Set
  - Sentiments - Set
  - Automated Reply - String
  - Is Deleted - Boolean
  - Is Ignored - Boolean
  - Is Unseen - Boolean

### Database Queries
---

- Front Page
  - Get all products owned by the user
  - Get all UnViewed Reviews with related product
  - Get all reviews from all products that owned by the user
  - Get product items that has reviews with defined sentiment word

- Product Page
  - Get reviews with defined sentiment word
  - Get selected product
  - Get all related reviews
    - sort sentiment words
    - calculate average rating
    - calculate average sentiment rating
    - calculate sentiment rating with date timeline
  - Get total review count from product
  - Update product title
  - Create new review for the product
  - Delete existing sentiment item

### TODO
---

- [ ] - All more customizability in integration page UI

#### Backend
- [ ] - Data Modeling
  - [x] - List all access patterns 
  - [x] - Update the database schema without any trigger values and aggregations
  - [/] - Model the database

  - [ ] - AWS Account
    - [/] - Create IAM account
    - [ ] - Setup with Dynamodb free tier 
 
- [ ] - API Routes

#### Frontend
 
#### UI/UX
- [x] - Theme colors
- [x] - Font
- [x] - Design library
- [x] - font sizes
- [x] - Brand name

- Front Page
  - Use gradient colors
  - Add animated video clip in frontend

- [x] - Home Page
- [x] - Single Review Page
  - [x] - review feed
  - [x] - single review options
  - [x] - header / product info / integration
  - [x] - filter box
  - [x] - Update button
  - [x] - Delete button
  - [ ] - Add new product/service card steps 
    - Title
    - Use Iframe to render data
  - [ ] - widget feed
  - [x] - Product/Service Edit popup

- [x] - Reviews Page
  - [x] - Settings
  - [x] - Statistics popup
  - [x] - Filter card
  - [x] - Add reviews

- [x] - Public Feed
  - [x] - Authenticate Page
  - [x] - Rate & Review Page

- [x] - Settings Page

  - Review page - https://play.google.com/store/apps/details?id=com.kitkagames.fallbuddies

### Integration Feature
---
- Use Iframe to render reviews feed
- Authorize before accepting public requests
- Custom Integration
  - For each product it has separate code snippets
    - Products will differentiate from the url ID
  - Copy and Paste the code snippet to creators website to generate review feed
  - Public users can interact with the review section once snippet in integrated
- Once users logged in with our app they can use the same account to write reviews anywhere
- Custom Integration workflow
  - Click create new product/service
  - Add the title
  - Generate Unique id for the product to identify integration
  - Allow user to copy and paste into their website
  - Review feed will appear on their website
- Development guide  - https://www.upwork.com/resources/build-shopify-app


### Product Features
---

#### Challenges
- Users can add review only after purchase
  - this means users most likely not going to put a review
  - solution:
    - Generate One time submit link and send it to buyers
- Manage Pricing and charging for customers

#### 2.0 or additional features
- [ ] - Get feedback about the review from public " was this review helpful ? / yes / no"
- [ ] - Features
- [ ] - Custom rating functionality (like in - https://eu.gymshark.com/products/gymshark-apex-t-shirt-black-onyx-grey-ss22)

#### Home
- Card
  - Unseen reviews
  - Unseen suggestions
  - All Positive, Natural, Negative Reviews
- Sentiment Filters at the top
- Global Search bar
- Create new card workflow
  - Specify the product/service name
  - Select preferred integration method (custom, shopify, wix)
  - Finish the creation

#### Single Product
- Sentiment Filters at the top
- Analytics
  - Total Reviews
  - Average Rating by stars
  - Average Sentiment ratings
- Product Settings
  - Product Delete button
    - Ask "are you sure you want to delete this item, this cannot be restored"
  - Product Edit button
    - Edit details popup
- Product header
  - Product Name
  - Integration Logo
  - Total Reviews
- Filters
  - By stars
  - By Unreplied
  - By Latest/New
  - By Date range
  - Clear button
- Statistics popup with date range and sentiment score
- Integration button
  - Copy the code snippet to clipboard
- Review
  - User info
  - Stars / heading / review body
  - Review translate option
  - Sentiment score
  - Ignore option
  - Delete option
  - Ability to translate reply with translated language
- Add Review (this option allows users to add existing reviews to their app)

#### Statistics
- Chart that shows best and worst product
- Learn how to build statistics - https://videos.blackmagic.so/justin-demo.mp4
- Engage with customers
- Target high volume customers
- Sentiment rate of all products

#### Integration
- Integration workflow
  - Option to enable/disable overall rating feature

#### Settings
- Billing section
  - Cancel subscription
  - Upgrade option & other available plans
  - Show available reviews
- Personal section
  - Sign out
  - Feedback option

### Sentiment NLP Features
---
- Automatic Topic grouping is a must have feature
- Identify suggestions from following customer feedback if there are no suggestions answer "no suggestions"

#### Review Level
- Identify Suggestions
- Generate the sentiment score & wether its positive or negative sentiment
- Classify Sentiment in 2 - 5 words
- Generate Automated reply for the review
- Detect foreign languages and translate automatically
  - Reply will also get generated automatically in EN
  - User has the ability to send the reply with original language
- Reply to the user with same language

#### Product Level
- Generate a score based on all available review scores
- Group available sentiment words (Positive, Neutral/Mixed, Negative)
- Group common suggestions (Negative, Positive)

### Resources
---
stemming, tokenization - https://www.kaggle.com/code/astraz93/beginners-tokenization-stemming-and-lemmatization
sentiment analysis - https://monkeylearn.com/sentiment-analysis