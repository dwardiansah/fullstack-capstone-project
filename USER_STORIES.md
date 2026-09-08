# GiftLink User Stories for GitHub Issues

You need at least 8 user stories created under your GitHub repository's **Issues** tab. Each issue must have one of these labels: `new`, `icebox`, `technical debt`, or `backlog`.

Here are the 8 pre-configured user stories with standard Agile structure and **Gherkin Acceptance Criteria** (`Given`, `When`, `Then`), ready to paste into GitHub Issues:

---

### Story 1: Browse Available Gifts
- **Title**: User Story: Browse Available Gifts on Main Page
- **Label**: `new`
- **Body**:
```markdown
### Role
As a community member seeking items,

### Action
I want to view a list of all available donated gifts on the main page,

### Business Value
So that I can easily discover gifts that fit my needs without having to create an account first.

### Acceptance Criteria
- [ ] Given a visitor opens the main catalog page, When gifts exist in the database, Then all 16 items are displayed with photos, titles, and categories.
- [ ] Given the gifts list is rendered, When an item card is inspected, Then a sentiment badge based on user comments is displayed.
- [ ] Given an item card on the main page, When the user clicks the item button, Then they are redirected to the item detail page.
```

---

### Story 2: Search and Filter Gifts by Category
- **Title**: User Story: Filter Gifts by Category and Criteria
- **Label**: `new`
- **Body**:
```markdown
### Role
As a visitor looking for specific products,

### Action
I want to filter gifts by category, condition, age, and keyword,

### Business Value
So that I can quickly narrow down relevant items without scrolling through the entire catalog.

### Acceptance Criteria
- [ ] Given a user is on the search page, When they select a category from the dropdown, Then the results update dynamically to match that category.
- [ ] Given a user specifies age and condition filters, When the search is submitted, Then only items matching all selected criteria are returned.
- [ ] Given no gifts match the search query, When the results load, Then a friendly "No matching gifts found" message is displayed.
```

---

### Story 3: User Registration
- **Title**: User Story: Register New User Account
- **Label**: `backlog`
- **Body**:
```markdown
### Role
As a new visitor to GiftLink,

### Action
I want to register an account with my name, email, and password,

### Business Value
So that I can log in, claim gifts, and leave comments.

### Acceptance Criteria
- [ ] Given valid registration details are entered, When the user submits the form, Then a new user is created and a JWT auth token is returned.
- [ ] Given an email that is already registered, When registration is attempted, Then an error message stating "Email already registered" is shown.
- [ ] Given a user registers, When the password is saved, Then the password is encrypted using bcrypt before database storage.
```

---

### Story 4: User Authentication & JWT Session
- **Title**: User Story: Secure User Login
- **Label**: `backlog`
- **Body**:
```markdown
### Role
As a registered user,

### Action
I want to log into my account using my email and password,

### Business Value
So that I can authenticate my session securely and have my username displayed in the navbar.

### Acceptance Criteria
- [ ] Given registered credentials, When the login form is submitted, Then a valid JWT token is returned and stored in session storage.
- [ ] Given a successful login, When the page refreshes, Then the user's first name is displayed in the navigation bar.
- [ ] Given incorrect password or unverified email, When login is attempted, Then a 400/404 error message is displayed to the user.
```

---

### Story 5: View Gift Details and Comments
- **Title**: User Story: View Detailed Gift Information
- **Label**: `backlog`
- **Body**:
```markdown
### Role
As an interested recipient,

### Action
I want to view complete details of a single gift including full description, date added, and comments,

### Business Value
So that I can verify item condition and make an informed decision before requesting it.

### Acceptance Criteria
- [ ] Given a gift ID in the route `/app/gift/:id`, When the page loads, Then item details (name, image, category, condition, age) are fetched via `/api/gifts/:id`.
- [ ] Given an item with comments, When details page renders, Then all reviewer comments and their sentiment indicators are displayed.
- [ ] Given an invalid or non-existent gift ID, When requested, Then a 404 Gift Not Found message is displayed.
```

---

### Story 6: Sentiment Analysis for Gift Comments
- **Title**: User Story: Automated Sentiment Analysis on Comments
- **Label**: `backlog`
- **Body**:
```markdown
### Role
As a donor and administrator,

### Action
I want the backend to automatically analyze sentiment of comments using the Natural package,

### Business Value
So that positive and negative sentiment can be flagged for community safety and engagement.

### Acceptance Criteria
- [ ] Given a comment string, When passed to the sentiment service, Then the Natural package tokenizes and scores the sentiment accurately.
- [ ] Given a positive comment, When scored, Then the sentiment returns "positive" and a green badge is rendered in the UI.
- [ ] Given a negative comment, When scored, Then the sentiment returns "negative" and an alert badge is rendered.
```

---

### Story 7: Database Connection Pooling & Reconnection
- **Title**: User Story: Implement Robust MongoDB Connection Caching
- **Label**: `technical debt`
- **Body**:
```markdown
### Role
As a backend developer,

### Action
I want to cache the MongoDB connection instance in `models/db.js`,

### Business Value
So that multiple requests do not create excessive database connections and degrade API performance.

### Acceptance Criteria
- [ ] Given `dbInstance` is already connected, When `connectToDatabase()` is called, Then the cached `dbInstance` is returned immediately without reconnecting.
- [ ] Given no active database connection, When `connectToDatabase()` is first called, Then `await client.connect()` executes successfully.
- [ ] Given the MongoDB server is unavailable, When connection is attempted, Then an informative error is logged and rethrown.
```

---

### Story 8: Real-time Claiming Notifications
- **Title**: User Story: Real-time In-app Notifications for Gift Claims
- **Label**: `icebox`
- **Body**:
```markdown
### Role
As a donor who posted a gift,

### Action
I want to receive an instant real-time notification when another user claims my gift,

### Business Value
So that I can coordinate handover immediately without checking my email.

### Acceptance Criteria
- [ ] Given a user claims a gift, When claim is confirmed, Then an in-app notification is sent to the item's original donor.
- [ ] Given an unread notification exists, When the user views the navbar, Then a notification badge indicator is displayed.
- [ ] Given the user clicks on the notification, When inspected, Then the notification is marked as read.
```
