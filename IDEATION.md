# Trip Planning App - Full Stack MVP

## 1. Landing Page / Home Page
   - **Purpose:** To introduce the app and guide users to sign up or log in.
   - Features:
     - A catchy headline or tagline explaining the app’s purpose (e.g., "Plan trips together with friends and family").
     - CTA (Call-to-Action) buttons: "Sign Up" / "Log In".
     - Short demo or video on how the app works.
     - Social proof (e.g., testimonials, user reviews).

## 2. Authentication (Sign Up / Log In)
   - **Purpose:** To allow users to create an account or log into their existing account.
   - Features:
     - Sign-up form (email, password, or social logins like Google/Facebook).
     - Login form (email/password or social logins).
     - Forgot password option.

## 3. Dashboard / Home (Post-Login)
   - **Purpose:** To give users an overview of their current or upcoming trips and allow them to create or join new trips.
   - Features:
     - Overview of active trips (cards with trip names, status, dates).
     - Option to create a new trip.
     - Option to view or join an existing trip (via invite link or code).
     - Option to view past trips.
     - Navigation bar to other areas of the app (Trip planning, Profile, Settings).

## 4. Create a Trip Page
   - **Purpose:** To allow users to set up a new trip.
   - Features:
     - Form to input basic trip details: trip name, destination, dates, description.
     - Option to invite friends by email or share a unique trip code/link.
     - Option to select trip preferences (e.g., travel dates, group size, budget, etc.).
     - Ability to save and return to complete the trip details later.

## 5. Trip Overview / Planning Page
   - **Purpose:** To collaboratively plan the trip with multiple people.
   - Features:
     - **Trip Details:** View and edit trip name, destination, dates, description.
     - **Group Members:** List of trip participants with options to chat, add/remove members.
     - **Collaborative Features:**
       - Shared itinerary (add activities, accommodations, flights).
       - Group voting (e.g., vote on destination activities or accommodation).
       - Budget tracker (split costs, add expenses).
     - **Notifications:** Alerts for new trip updates, activity changes, or votes.
     - **Trip Documents:** Upload or share important trip documents (e.g., hotel booking, tickets, etc.).
     - **Group Chat:** Simple in-app messaging for group communication (optional for MVP).

## 6. Itinerary / Activities Page
   - **Purpose:** To allow users to plan and view trip activities (e.g., sightseeing, dining, excursions).
   - Features:
     - Calendar view for trip days with a list of planned activities.
     - Add/edit activities with titles, descriptions, times, and location info.
     - Option for participants to suggest or vote on activities.
     - Map integration (optional for MVP) showing activity locations.

## 7. Budget Tracker / Cost Sharing Page
   - **Purpose:** To manage expenses for the trip and keep track of contributions from each person.
   - Features:
     - Input fields to add expenses (who paid, what was purchased, amount).
     - Split costs evenly or specify who paid what.
     - Total trip cost and per person cost.
     - Overview of balances (who owes what).

## 8. Notifications Page (or Notification Center)
   - **Purpose:** To keep users updated on changes to the trip (e.g., new activities, payments).
   - Features:
     - Notifications for trip updates, changes, or new votes.
     - Notification preferences (e.g., email or in-app only).

## 9. User Profile Page
   - **Purpose:** To allow users to view and update their personal information.
   - Features:
     - Profile photo, name, and basic info.
     - Overview of past trips.
     - Option to update email, password, and other settings.
     - Preferences for notifications, privacy, etc.

## 10. Settings Page
   - **Purpose:** To allow users to adjust account settings.
   - Features:
     - Change email, password, and notification preferences.
     - Delete account option.
     - Connect social accounts for easy login.

---

### Optional (Post-MVP) Features:
Once the MVP is complete, additional features can be added, such as:
- **Travel Recommendations** (suggested destinations, activities, or experiences based on preferences).
- **Itinerary Export** (ability to download or share the trip itinerary).
- **Trip Journal/Photos** (a way for users to document their experiences).
- **Push Notifications** (for real-time updates on mobile).

---

### Class Diagram for the App

To create the basic class diagrams for the trip planning app, here are some essential classes and their relationships.

1. **User Class**
   - Represents the users of the app who can create and manage trips.
   - **Attributes:**
     - `user_id` (int)
     - `name` (string)
     - `email` (string)
     - `password` (string)
     - `profile_picture` (string, optional)
     - `trips` (List[Trip]) — list of trips the user is a part of.
   - **Methods:**
     - `sign_up()`
     - `log_in()`
     - `update_profile()`
     - `send_invite()`

2. **Trip Class**
   - Represents the trip being planned. A trip can have multiple participants and activities.
   - **Attributes:**
     - `trip_id` (int)
     - `name` (string)
     - `destination` (string)
     - `start_date` (Date)
     - `end_date` (Date)
     - `description` (string)
     - `budget` (float)
     - `participants` (List[User]) — list of users involved in the trip.
     - `activities` (List[Activity]) — list of activities for the trip.
     - `expenses` (List[Expense]) — list of expenses associated with the trip.
   - **Methods:**
     - `add_activity(activity: Activity)`
     - `remove_activity(activity: Activity)`
     - `add_participant(user: User)`
     - `remove_participant(user: User)`
     - `set_budget(budget: float)`
     - `track_expense(expense: Expense)`

3. **Activity Class**
   - Represents activities planned during the trip (e.g., sightseeing, dining, etc.).
   - **Attributes:**
     - `activity_id` (int)
     - `title` (string)
     - `description` (string)
     - `location` (string)
     - `time` (DateTime)
     - `participants` (List[User]) — users who will participate in the activity.
   - **Methods:**
     - `add_participant(user: User)`
     - `remove_participant(user: User)`
     - `edit_activity_details(title: string, description: string, time: DateTime)`

4. **Expense Class**
   - Represents an expense associated with the trip, which can be split among users.
   - **Attributes:**
     - `expense_id` (int)
     - `amount` (float)
     - `description` (string)
     - `paid_by` (User) — the user who paid the expense.
     - `split_among` (List[User]) — the users sharing the cost.
   - **Methods:**
     - `split_expense()`
     - `add_participant(user: User)`
     - `remove_participant(user: User)`

5. **Notification Class**
   - Represents notifications sent to users about trip updates (e.g., new activities, changes).
   - **Attributes:**
     - `notification_id` (int)
     - `message` (string)
     - `user` (User) — the user who will receive the notification.
     - `date_created` (DateTime)
     - `type` (string) — (e.g., "Trip Update", "Activity Change", "New Expense").
   - **Methods:**
     - `send_notification()`

6. **Itinerary Class**
   - Represents the overall plan for the trip, including the list of activities.
   - **Attributes:**
     - `itinerary_id` (int)
     - `trip` (Trip) — the trip associated with this itinerary.
     - `activities` (List[Activity]) — list of activities for the trip.
   - **Methods:**
     - `add_activity(activity: Activity)`
     - `remove_activity(activity: Activity)`
     - `view_itinerary()`

7. **Invite Class**
   - Represents an invitation sent to users to join a trip.
   - **Attributes:**
     - `invite_id` (int)
     - `trip` (Trip) — the trip being planned.
     - `sender` (User) — the user who sent the invite.
     - `recipient_email` (string) — the email of the invited user.
     - `status` (string) — ("Pending", "Accepted", "Declined").
   - **Methods:**
     - `send_invite()`
     - `update_status(status: string)`

---

### App Name Suggestions:
- **TripSync**
- **PlanTogether**
- **JourneyHub**
- **TripMate**
- **GroupTrek**
- **TripPal**
"""
