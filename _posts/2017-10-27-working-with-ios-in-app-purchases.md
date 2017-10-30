---
layout: post
title: Working with iOS in-app purchases
author: mateusz
hidden: true
tags: ['ios', 'in-app purchases', 'itunes connect', 'subscriptions', 'swift']
comments: true
---

There are more pleasant things to do in iOS development than setting up and testing the in-app purchases. The process is laborious and requires thorough testing, especially that in-app purchases are crucial from business perspective.

## iTunes Connect configuration - part 1

**This tutorial is based on auto-renewable subscriptions, but you can configure any other in-app purchase in a very similar way.**

To set up in-app purchase follow the steps below:

1. Log in to [iTunes Connect](https://itunesconnect.apple.com).

2. Open **My Apps** and select the app you'll configure.

3. Open **Features** header and select **In-App Purchases** on the left pane.

4. Click **+** icon and select the in-app purchase type. There are 4 types of in-app purchases that you can use:

    ![image](/images/working-with-ios-in-app-purchases/in-app-purchases.png)

    Each type has a specific use case so make sure you read the descriptions fist.

5. **Assuming you've selected Auto-Renewable Subscription**, provide the **Reference Name** and **Product ID**.

    a) The reference name is used on iTunes Connect and in Sales and Trends reports only. It won't be displayed in the App Store, so it can be anything you like.

    b) Product ID must be unique, so it's recommended to use your app reversed domain with a subscription name, for example: `com.reversed.domain.onemonth`.

6. Select **Create New Subscription Group** or chose already existing group, if any.

    All auto-renewable subscription must be part of a group. Users can only subscribe to one subscription in a group a time, but they can change to another subscription in the same group. This allows users to upgrade or downgrade subscription without paying twice for the same service.

    **Subscription Group Reference Name**, same as the reference name, is used on iTunes Connect and in Sales and Trends reports only.

7. Auto-renewable subscription details page should appear. Select **Subscription Duration** (from 1 week to 1 year) and **optional Free Trial** period (from 3 days to 1 year).

    ![image](/images/working-with-ios-in-app-purchases/subscription-duration.png)

8. Click **Set Starting Price** to select the default currency and price (you must chose from pricing tiers), prices for other countries are calculated automatically.

9. Now you can select a different price for individual territories. After you save changes you'll notice that you price is kept as pricing tier:

    ![image](/images/working-with-ios-in-app-purchases/pricing-tier.png)

10. Add at least one **Localization** including **Subscription Display Name** and **Description**, preferably for all languages you support. Those values will be visible to the users, so make sure they sound trustworthy.

11. Now you need to add at least one **Localization** to your subscription group. Save changes and select the group you've created in step 6 on the left pane. Fill **Subscription Group Display Name** and optionally set **Custom Name** if your app name if different than your service or publication name. Keep in mind that those values will be visible to the users.

As you've probably noticed, we've skipped the **Review Information** section in product details. To fill up this section we first need to make an App Store call from our application in order to continue the configuration phase.

**If you won't be able to fetch the purchasable products you've configured please note that it can take even a few hours for your products to register in iTunes Connect.**

## Setting up a test account

You need to create a sandbox test account in order to test the in-app purchases.

1. Log in to [iTunes Connect](https://itunesconnect.apple.com).

2. Open **Users and Roles**.

3. Open **Sandbox Testers** header.

    ![image](/images/working-with-ios-in-app-purchases/sandbox-user.png)

4. Click **+** icon and fill test account details. Keep the credentials.

    You can use a fake email address for testing (an easy one), but **Apple might send you an e-mail to verify the test account** and using fake account you won't be able to do that so you'll need to create another one because purchases from unverified account will always fail.

## Project configuration

Now you need to make some changes to your **Xcode project**.

1. Open the project settings (click on the root of your project's files tree).

2. In **General** header, scroll down to **Linked Frameworks and Libraries**.

3. Click **+** icon, find **StoreKit.framework** and click **Add**.

    ![image](/images/working-with-ios-in-app-purchases/store-kit.png)

4. Open **Capabilities** header and turn **In-App Purchase** on.

    ![image](/images/working-with-ios-in-app-purchases/capability.png)

And it's finally time for some coding!

## Code

(code in Swift)

X.

## iTunes Connect configuration - part 2

Since you already have implemented the in-app purchases and took a screenshot of a system dialog when connecting to the App Store API, you can finally finish the iTunes Connect configuration.

Go back to your in-app purchase details page on iTunes Connect (My Apps->Your app->Features->In-App Purchases->Your purchase) and scroll down to **Review Information**.

Upload the screenshot and enter the credentials of the sandbox account you've used in **Review Notes**.

![image](/images/working-with-ios-in-app-purchases/review-information.png)

Save changes and make sure that the **Availability** of your in-app purchase is set to **Cleared for Sale** (on the top of the page).

Remember that your **first in-app purchase must be submitted with a new app version**. Once your binary has been uploaded and your first in-app purchase has ben submitted for review, additional in-app purchases can be submitted from the In-App Purchases section.

## Testing

// todo

// note about switching store, if necessary

## Server-side subscription validation

You can verify whether user's subscription is still valid outside the app. It's especially useful when your application is also available on other platforms with separate store like Android, and you decide to make your user pay only once, per account, not per platform.

To validate user's subscription server-side you'll need a **Shared Secret**. You can find it in your app's In-App Purchases list (My Apps->Your app->Features->In-App Purchases), click **App-Specific Shared Secret** to open a dialog with the secret. If necessary, click **Generate Shared Secret**.

![image](/images/working-with-ios-in-app-purchases/shared-secret.png)



## Be meticulous

(summary)

By the way, do you know, that even if you flow those instructions, **your iOS app might be rejected?** [Follow this blog post to find out why](https://brightinventions.pl/blog/dont-let-your-ios-app-be-rejected/).
