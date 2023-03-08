### User Workflows
<hr>

#### Sign Up Workflow
```mermaid
graph TB
A[Enter Email <br> Enter Password <br> Confirm Password]
B[Sends confirmation email to user]
C[User clicks on the email link]
D[Redirect to user dashboard]

A --> B
B --> C
C --> D
```

#### Creating a New Product
```mermaid
graph TB
A[Click on create new product/service in  home page]
B[Enter Product/Service title <br> Select Widget layout mode - Standard, Wall, Horizontal Slide <br> Q/A section - Enable, Disable <br> Widget Access Mode - Public, Private <br> Email Request Template - Dropdown of email templates ]
C[Creates a new product/Service]
A --> B
B --> C
```

**Widget Access Mode**
Ultimately, the decision of whether to allow every visitor to leave a review or only buyers should be based on your specific business needs and goals. If you are looking to drive engagement and increase traffic to your site, allowing every visitor to leave a review may be a good option. If you are more concerned with ensuring the authenticity of your reviews, requiring buyers to leave a review may be the better choice.

**Automatically Post high sentiment & 5 star ratings on social media**
Facebook - https://developers.facebook.com/docs/pages/publishing/
Linkedin - https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access?context=linkedin%2Fcontext&view=li-lms-2023-02

#### Email request sending
```mermaid
graph TB
AAA[Created new request <br> from dashboard]
BBB[Click on Add New Email Request]
CCC[Enter recipient email <br> Enter Interval Period <br> Select related product]
AA[Triggered by API]
A[User purchase product <br> through shopify]
B[Schedule a Email Request]
C[Send Email]
D{Review Submitted}
E[Successfully collected the review]
F[Send Email through dashboard]

A --> B
AA --> B
AAA --> BBB
BBB --> CCC
CCC --> B
B --> C
C --> D
D --Yes--> E
D --No--> F
F --> D
```

#### Public / Private review submission


```mermaid
graph TB
A[User receives the review request email]
B[Enter title <br> Select star rating <br> Enter review]
C[Click submit the review]
D[Redirect to the <br> review webpage and <br> asks for additional info - <br> Occupation <br> Add image/video]
E[Successfully submitted the review]
F[Redirect to social media share]
A --> B
B --> C
C --Save to database--> D
D --Update the database with additional info--> E
E --> F
```

**Redirection webpage**
Redirection webpage depends on users form completion -

First web UI - If user entered all required information then user will be prompted to ask only additional information

Second web UI - If user didn't enter the required information it will prompt UI with all form fields to asking for all information

First UI is specific for email request emails and Second web UI can be also used in link requests

#### Creating new email template


```mermaid
graph TB
A[Click on create new template]
B[Enter title of the product]
C[Redirect with pre-made template]
A --> B
B --> C
```

show email template used product names list in the template customize dashboard