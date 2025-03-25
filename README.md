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
        apiUrl: "https://localhost:7141",  // API endpoint for feedback submission
        cssUrl: "/css/aware-feed.css", //customize styling
        lang:"en", //set preferred language
        localization: { //Configure for custom localization
            fr: {
                careOpinions: "Nous valorisons vos avis"
            }
        }
    };    
</script>
```

This configuration allows you to specify:
- **application**: A unique identifier for your application.
- **userId**: The current user's unique identifier (if available).
- **apiUrl**: The API endpoint where feedback data is submitted.
- **cssUrl**: Custom css endpoint address, creates a link element in your page.
- **lang**: Set your page language.
- **localization**: In default, EN ve TR localizations enabled if you customize for your own language use this option.

Once these steps are completed, the page rating component will be active and ready to collect user feedback.

![image](https://github.com/user-attachments/assets/4d03a56e-0dfd-40dd-8b5a-f5897f7ecbdd)


---

For more details, visit the repository: [AwareFeedback](https://github.com/asetil/AwareFeedback).
