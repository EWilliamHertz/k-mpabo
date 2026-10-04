# Calendar Integration Plan: Kåmpabo (kampabo.se)

This document outlines the strategy for creating an automated, synchronized calendar that handles bookings from the direct website (kampabo.se) and external platforms like Airbnb, Booking.com, etc.

## 1. Objective
To maintain a single source of truth for property availability, ensuring that:
- When a booking is made on kampabo.se, the dates are blocked on Airbnb.
- When a booking is made on Airbnb, the dates are blocked on kampabo.se.
- Double bookings are prevented.
- Visitors to kampabo.se see an accurate, up-to-date availability calendar.

## 2. Core Technology: iCalendar (iCal / .ics)
The industry standard for syncing availability across different booking platforms is the **iCalendar (.ics)** format. Almost all major Online Travel Agencies (OTAs) like Airbnb, Booking.com, and VRBO support exporting and importing iCal feeds.

## 3. Integration Approaches

We have two main paths to achieve this, depending on budget and how critical real-time syncing is.

### Option A: Direct iCal Synchronization (Cost-Effective)
This involves our website generating its own iCal feed and reading feeds from other platforms.

*   **How it works:**
    1.  **Export:** Our backend generates a dynamic URL (e.g., `kampabo.se/api/calendar/export.ics`) containing all confirmed direct bookings. We give this URL to Airbnb.
    2.  **Import:** We take the iCal export URL provided by Airbnb and save it in our backend.
    3.  **Sync:** Our server periodically (e.g., every 15-30 minutes) fetches the Airbnb iCal, parses the blocked dates, and updates our database.
*   **Pros:** Free (no third-party subscription fees), relatively straightforward to build.
*   **Cons:** **Sync Delay.** iCal syncing is not instantaneous. Airbnb might only check our link every few hours, and our server will only check theirs periodically. There is a small window where double bookings can occur if two people book the exact same dates simultaneously on different platforms.

### Option B: Channel Manager API (Robust & Scalable - Recommended)
A Channel Manager is a third-party software designed specifically to sit in the middle of all your booking platforms and sync them instantly. (Examples: Smoobu, Hostaway, Lodgify).

*   **How it works:**
    1.  We connect our Airbnb account to the Channel Manager.
    2.  We connect our kampabo.se website to the Channel Manager using their API (or embed their calendar widget directly).
    3.  The Channel Manager pushes updates to all platforms in real-time.
*   **Pros:** Instant synchronization (virtually eliminates double bookings), central dashboard for managing rates and messages, easy to add more platforms (Booking.com, Expedia) later.
*   **Cons:** Monthly subscription cost (usually starting around $20-$30/month).

## 4. Technical Implementation Steps (Assuming Option A: Custom iCal)

If we proceed with building our own iCal sync for kampabo.se:

### Step 4.1: Database Updates
Ensure the database has a robust `Bookings` model:
- `id`
- `start_date`
- `end_date`
- `status` (e.g., 'pending', 'confirmed', 'blocked')
- `source` (e.g., 'kampabo.se', 'airbnb')
- `external_reference_id` (To map Airbnb bookings to our DB so we don't duplicate them on subsequent syncs).

### Step 4.2: Backend Endpoints
1.  **`GET /api/calendar/export.ics`**:
    - Queries the database for all `confirmed` bookings where `source = 'kampabo.se'`.
    - Formats the data into standard iCalendar syntax.
    - Returns the `.ics` file.
2.  **Cron Job / Worker (Import Sync)**:
    - A scheduled task that runs every X minutes.
    - Fetches the Airbnb `.ics` URL.
    - Parses the events (using a library like `icalendar` or `node-ical`).
    - Updates our database: Adds new blocked dates, removes dates that have been cancelled on Airbnb.

### Step 4.3: Frontend Calendar UI
- The user-facing calendar on kampabo.se fetches availability from our database API.
- It displays dates as either "Available" or "Unavailable" (combining direct bookings and Airbnb blocks).

## 5. Next Steps & Prerequisites

1.  **Decision:** Choose between building the custom iCal sync (Option A) or integrating a Channel Manager (Option B).
2.  **Email Infrastructure (ReSend / DNS):** As mentioned in the chat, finalizing the DNS settings and ReSend integration is crucial. When a direct booking is made on kampabo.se, we must be able to instantly send an automated confirmation email from a verified `@kampabo.se` address.
3.  **Airbnb Account:** Ensure the Airbnb listing is active so we can access its calendar export/import settings to test the connection.
