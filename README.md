# AwareFeedback

## Description
AwareFeedback is a proof-of-concept (POC) project designed to enable users to seamlessly integrate a page rating component into their webpages. This lightweight and easy-to-configure plugin allows websites to collect user feedback efficiently by embedding a simple JavaScript component.

## How to Use
To integrate AwareFeedback into your webpage, follow these steps:

### 1. Include the Script
Add the following script tag to your HTML page:

```html
<script type="text/javascript" src="~/js/aware-feed.js"></script>
```

### 2. Configure the Plugin
Define the `awareFeed` configuration in your JavaScript section:

```html
<script type="text/javascript">
    window.awareFeed = {
        application: "NAMSO",  // Unique application identifier
        userId: "@(Guid.NewGuid().ToString())",  // Unique user identifier
        template: "namso1",  // Template style identifier
        apiUrl: "https://localhost:7141"  // API endpoint for feedback submission
    };    
</script>
```

This configuration allows you to specify:
- **application**: A unique identifier for your application.
- **userId**: The current user's unique identifier (if available).
- **template**: The template style used for the feedback component.
- **apiUrl**: The API endpoint where feedback data is submitted.

Once these steps are completed, the page rating component will be active and ready to collect user feedback.

---

For more details, visit the repository: [AwareFeedback](https://github.com/asetil/AwareFeedback).
