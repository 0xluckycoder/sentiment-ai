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

- Federated Auth Entity
  - avatar_url
  - first_name
  - last_name
  - email

- User Entity
  - id - UUID - (PK)
  - federated_id - String
  - pricing_plan - String
  - last_payment_date - Number (UNIX TimeStamp)
  - remaining_reviews - Number
  - created_at - Date/Time
  - is_unpaid - Boolean

- Product Entity
  - id - UUID - (PK)
  - user_id - UUID - (SK)
  - title - String
  - created_at - Number (UNIX TimeStamp)
  - updated_at - Number (UNIX TimeStamp)

- Review Entity
  - id - UUID - (PK)
  - product_id - UUID - (FK)
  - user_federated_id - String
  - title - String
  - review_description - String
  - star_rate - Number
  - occupation - String
  - sentiment_rate - Number
  - automated_suggestions - Set
  - sentiments - Set
  - automated_reply - String
  - reply - String
  - is_deleted - Boolean
  - is_ignored - Boolean
  - is_unseen - Boolean
  - created_at (submitted) - Number (UNIX TimeStamp) - (SK)
  - updated_at - Number (UNIX TimeStamp)
### Database Access Patterns
---

- Users
  - Get all users by federated_id - make the fed id partition key

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

- [ ] - Allow more customizations in integration page UI 

#### Backend
- [x] - Data Modeling
  - [x] - List all access patterns 
  - [x] - Update the database schema without any trigger values and aggregations
  - [x] - Model the database

  - [x] - AWS Account
    - [x] - Create IAM account

  - [x] - Dynamodb
    - [x] - configure with free tier
    - [x] - create tables
    - [x] - load sample data
      - [x] - perform queries & mutations

  - [/x] - Configure development environment with AWS SAM, TypeScript & node_modules

  - OpenAPI Specification - https://spec.openapis.org/oas/v3.1.0#openapi-specification

add this important feature to the app - 
---------------------------------------------------------------------------
make it easier for users to filter by complains & negatives
allow users to see all negative, positive, natural suggestions in one place