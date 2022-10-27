---
author: fjablonski
tags:
  - bitrise
  - detox
  - react native
  - CI
date: 2020-11-21T17:35:00.000Z
title: Bitrise Loves Detox
layout: post
image: /images/blog_cover_bitrise_detox.png
hidden: false
comments: true
published: true
---

You finally did it! New functionality is ready to be deployed. This new feature will revolutionize the market, will give tons of new users and other few millions on your account. Fantastic feeling, isn't it? Once the app is in store, you start to rub your hands. But what if your app ranting suddenly goes down, people are frustrated because you have broken one of the other core functionalities by accident. Sweaty and stressed, you start to debug. Thankfully it is easy to fix. A few more clicks and the updated version lands in a store. Sigh... that was too close if there was something that could prevent such situations in the future.

Please welcome Bitrise and Detox! Bitrise is a CI/CD  service with a Mobile-First approach, while Detox is a tool that allows you to create an E2E test with the Gray Box approach to React Native. I will show how nice and easy you can launch tests written with Detox on Bitrise.

Sample React Native project with configured Detox tests you can download from here https://gitlab.com/Filipsky/bitrise_loves_detox.
I added there one specific setting, which is vital while launching Detox tests on Bitrise. It will build the app in a Release configuration. We will test precisely the same app that will land in users hands, and CI will not have to launch React Native launch packagers, which might cause some problems with tests.

With a set-up project, all you have to do is go to https://www.bitrise.io and create your new account!

Bitrise is free of charge with some limitations you want to get rid of it. Check out the pricing page for some paid plans.

Ok, it is time for some action! After you created your account and log in, you should see a beautiful button Add New App. Please press it and choose "Add New App on Web UI."

![Add New App](/images/bitrise_loves_detox/add-new-app.png)

You probably would like to keep your super project private, but you can make it public as well.

![Select Private](/images/bitrise_loves_detox/select-private.png)

Now let's select the repository where you store your project. For me, it is GitLab.

![Select Repository](/images/bitrise_loves_detox/repo-select.png)

If you are using some private libraries, you can create ssh keys to access. My project is pretty simple, so that I will skip this step.

![Skip adding ssh keys](/images/bitrise_loves_detox/ssh-keys.png)

Type name of your main branch.

![Choose main branch](/images/bitrise_loves_detox/choose-branch.png)

Sigh... that is a lot of things to configure. So maybe Bitrise could automate some of the processes. Thankfully it can. Let's take a short break and let Bitrise do its job. This process might take a while.

![coffe break](/images/bitrise_loves_detox/coffe-break.png)

You can proceed or edit these settings if you do not like the final results

![Project configuration](/images/bitrise_loves_detox/configuration.png)

If you have an icon for your remarkable app, you can add it here. There is also an option for a webhook so you can integrate Bitrise with some of your external systems. I do not have such a requirement, so that I will skip it.

![App icon, webhook](/images/bitrise_loves_detox/webhook-app-icon.png)

Congrats! You just added your first project on Bitrise!

![New app](/images/bitrise_loves_detox/your_new_app.png)

It is time for some real action. We need to launch our tests! Thankfully Bitrise did almost all the dirty work for us, so all we need to is to run these four lines of commands:
```shell
pod install --project-directory=ios/
npm install -g detox-cli
detox build --configuration ios
detox test --configuration ios --workers 2
```

The first one will download all pods for our ios project. The second one will install "detox cli," which is not present on the stack we are using.  The third one builds our application to make it testable with Detox. The last one will launch our tests, to get results faster, I choose two workers.

Select your application on the top right side of the screen and then select the "Workflow" tab

![Workflow select](/images/bitrise_loves_detox/workflow-select.png)

Press on the "+" sign below the last Yarn step. 

![Edit workflow](/images/bitrise_loves_detox/edit_workflow.png)

Then search and choose Script.

![Search for Script](/images/bitrise_loves_detox/search_script.png)

Now you can configure script content with our four lines :).

![Configure Script](/images/bitrise_loves_detox/script_edit.png)

Press Save on the top-right corner. 
Your new workflow is ready! It is time to check this beast in action.
Select Start/Schedule Build

![Start schedule](/images/bitrise_loves_detox/start_schedule.png)

And then Start Build.

![Start schedule](/images/bitrise_loves_detox/run_build.png)

Congrats! You just become an owner of a project with its CI!

![End Result](/images/bitrise_loves_detox/end_result.png)

Now you're not afraid to face new features, and the word "quality" gets a new meaning.

I highly encourage you to keep digging. Bitrise has plenty of preconfigured steps, which can make your life way more comfortable. You can make a step forward and add configuration which will launch unit tests or give a possibility to deploy your app with just one button click. Who knows what awaits you just behind the corner!



