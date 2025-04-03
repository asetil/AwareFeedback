/**
 * @author Osman Sokuoğlu
 * @see {@link https://jsdoc.app/tags-description.html} for further information.
 * @description This plugin enables you to add a page rating component to your web pages for customer experience
 */

(function () {
    const feedbackPlugin = {
        getUrl: function (url) {
            if (!window.awareFeed || !window.awareFeed.apiUrl) {
                console.error("AWARE_FEED_ERROR_2", "Define api url");
                return;
            }

            const apiUrl = window.awareFeed.apiUrl;
            return apiUrl + url;
        },
        init: function () {
            window.awareFeed = window.awareFeed || {};

            //Arrange css
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";

            const cssLink = window.awareFeed.cssUrl || "/css/aware-feed.css";
            link.href = this.getUrl(cssLink);
            document.head.appendChild(link);

            //arrange localization
            const localizations = this.getLocalization();
            let localization = localizations[window.awareFeed.lang || "tr"];

            const feedbackContainer = document.createElement("div");
            feedbackContainer.classList.add("aware-feedback");

            const button = document.createElement("button");
            button.title = localization.ratePage;
            button.classList.add("feedback-button");
            button.onclick = this.togglePopup.bind(this, false);
            feedbackContainer.appendChild(button);

            const popup = document.createElement("div");
            popup.classList.add("feedback-popup");

            //loader
            const loadingDiv = document.createElement('div');
            loadingDiv.classList.add("feedback-loading");

            //const spinner = document.createElement('div');
            //spinner.classList.add("feedback-loading-spinner");
            //loadingDiv.appendChild(spinner);
            //popup.appendChild(loadingDiv);

            const spinner = document.createElement('div');
            spinner.classList.add("spinner-container");

            const spinner1 = document.createElement('div');
            spinner1.classList.add("spinner-1");
            spinner.appendChild(spinner1);

            const spinner2 = document.createElement('div');
            spinner2.classList.add("spinner-2");
            spinner.appendChild(spinner2);

            loadingDiv.appendChild(spinner);
            popup.appendChild(loadingDiv);

            const title = document.createElement("h3");
            title.innerText = localization.careOpinions;
            title.classList.add("feedback-title");
            popup.appendChild(title);

            const label1 = document.createElement("label");
            label1.innerText = localization.changeWhat;
            label1.classList.add("lbl-feed");
            popup.appendChild(label1);

            const textarea = document.createElement("textarea");
            textarea.placeholder = localization.thoughts;
            textarea.classList.add("feedback-textarea");
            popup.appendChild(textarea);

            const label2 = document.createElement("label");
            label2.innerText = localization.whatDifficulties;
            label2.classList.add("lbl-feed");
            popup.appendChild(label2);

            const textarea2 = document.createElement("textarea");
            textarea2.placeholder = localization.thoughts;
            textarea2.classList.add("feedback-textarea");
            popup.appendChild(textarea2);

            // Star Rating System
            const label3 = document.createElement("label");
            label3.innerText = localization.pageRate;
            label3.classList.add("lbl-feed");
            label3.classList.add("mb-0");
            popup.appendChild(label3);

            const starRatingContainer = document.createElement("div");
            starRatingContainer.classList.add("star-rating");
            let rating = 0;

            for (let i = 1; i <= 5; i++) {
                const star = document.createElement("span");
                star.classList.add("star");
                star.innerText = "★";
                star.dataset.rating = 6 - i;
                star.onclick = () => {
                    rating = 6 - i;
                    this.updateStarRating(starRatingContainer, rating);
                };
                starRatingContainer.appendChild(star);
            }
            popup.appendChild(starRatingContainer);

            const feedbackMessage = document.createElement("span");
            feedbackMessage.innerText = "";
            feedbackMessage.classList.add("feedback-message");
            feedbackMessage.classList.add("hide");
            popup.appendChild(feedbackMessage);

            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("feedback-button-container");

            const submitButton = document.createElement("button");
            submitButton.innerText = localization.btnSend;
            submitButton.classList.add("feedback-submit-button");
            submitButton.onclick = () => {
                this.sendFeedback(textarea.value, textarea2.value, rating);
            };

            const closeButton = document.createElement("button");
            closeButton.innerText = localization.btnCancel;
            closeButton.classList.add("feedback-cancel-button");
            closeButton.onclick = this.togglePopup.bind(this, true);

            buttonContainer.appendChild(closeButton);
            buttonContainer.appendChild(submitButton);
            popup.appendChild(buttonContainer);

            feedbackContainer.appendChild(popup);
            document.body.appendChild(feedbackContainer);
        },
        togglePopup: function (hide) {
            const popup = document.querySelector(".feedback-popup");
            const btnFeedback = document.querySelector(".feedback-button");

            if (hide) {
                popup.classList.remove("active");
                btnFeedback.classList.remove("hide");
            }
            else {
                this.toggleLoader(false);
                popup.classList.add("active");
                btnFeedback.classList.add("hide");
            }
        },
        updateStarRating: function (container, rating) {
            const stars = container.querySelectorAll(".star");
            stars.forEach((star, index) => {
                let calculated = 5 - index;
                if (calculated <= rating) {
                    star.classList.add("rated");
                } else {
                    star.classList.remove("rated");
                }
            });
        },
        showMessage: function (content) {
            const message = document.querySelector(".feedback-message");
            message.innerText = content;
            message.classList.remove("hide");
            setTimeout(() => { message.classList.add("hide") }, 5000);
        },
        toggleLoader: function (show) {
            const loader = document.querySelector(".feedback-loading");
            if (show)
                loader.classList.add("active");
            else
                loader.classList.remove("active");
        },
        sendFeedback: function (feedback, difficulties, rating) {
            this.toggleLoader(true);

            window.awareFeed = window.awareFeed || {};
            const localizations = this.getLocalization();
            let localization = localizations[window.awareFeed.lang || "tr"];

            if (!feedback.trim() && !difficulties.trim() && (!rating || rating <= 0)) {
                this.showMessage(localization.messageNoInfo);
                this.toggleLoader(false);
                return false;
            }

            const saveUrl = this.getUrl("/feedback/save");
            fetch(saveUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ path: window.location.pathname || "/", content: feedback, difficulties: difficulties, rating: rating, applicationId: window.awareFeed.application, userId: window.awareFeed.userId, type: 1 }),
            }).then(response => response.json())
                .then(data => {
                    this.toggleLoader(false);
                    this.showMessage(localization.messageSuccess);
                    this.togglePopup(true);
                })
                .catch(error => {
                    this.toggleLoader(false);
                    console.error("AWARE_FEED_ERROR_1", error);
                    this.showMessage(localization.messageSendError);
                });
        },
        getLocalization: function () {
            const result = {
                tr: {
                    ratePage: "Sayfayı Değerlendirin",
                    careOpinions: "Görüşlerinizi Önemsiyoruz",
                    changeWhat: "Sayfamızda Neyi Değiştirmek İstersiniz?",
                    whatDifficulties: "Sayfamızda Neleri Kullanmakta Zorlanıyorsunuz?",
                    thoughts: "Düşünceleriniz",
                    pageRate: "Sayfamızı Oylayın",
                    btnCancel: "Vazgeç",
                    btnSend: "Gönder",
                    messageSuccess: "Geri bildiriminiz başarıyla alındı.",
                    messageNoInfo: "Herhangi bir bilgi girişi yapmadınız!",
                    messageSendError: "Geri bildiriminiz gönderilirken bir hata meydana geldi. Lütfen daha sonra tekrar deneyiniz!"
                },
                en: {
                    ratePage: "Rate the Page",
                    careOpinions: "We Care About Your Opinions",
                    changeWhat: "What would you like to change on our page?",
                    whatDifficulties: "What do you have difficulty using on our page?",
                    thoughts: "Your thoughts",
                    pageRate: "Vote Our Page",
                    btnCancel: "Cancel",
                    btnSend: "Send",
                    messageSuccess: "Your feedback has been received successfully.",
                    messageNoInfo: "You have not entered any information!",
                    messageSendError: "An error occurred while sending your feedback. Please try again later!"
                }
            }

            if (window.awareFeed.localization) {
                return Object.assign(window.awareFeed.localization, result);
            }

            return result;
        }
    };

    document.addEventListener("DOMContentLoaded", function () {
        feedbackPlugin.init();
    });
})();

// 1. Başarılı gönderildiğine dair mesaj
//2. admin page table template