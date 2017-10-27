---
layout: post
title: 'Slack + Fastlane = ❤️. About one of puzzles of Continous Integration.'
excerpt: 'Professional development process consist of many puzzles. Some of these puzzles can be testing, choosing good architecture, clean code, continous integration and many more.
In this post I want to focus on one of theese puzzles - Continous Integration(CI). An integral part of CI on iOS Development proccess is a great tool called [Fastlane](https://fastlane.tools/).
Fastlane is a powerfull tool which handles a number of tasks like: dealining with code signing, creating .ipa files, generating screenshots to AppStore and many more. One of cool feature of Fastlane is a Slack integration - and that is what I wanted to write about.'
author: kwysocki
tags : [iOS, swift, fastlane, slack, continuous integration]
comments: true
hidden: false
image: /images/slack-fastlane/puzzle.jpg
---

![](/images/slack-fastlane/puzzle.jpg){: .center-image}

Professional development process consist of many puzzles. Some of these puzzles can be: unit tests, choosing good architecture, clean code, continuous integration and much more.
In this post, I want to focus on one of these puzzles - Continous Integration(CI). An integral part of CI in iOS Development process is a great tool called [Fastlane](https://fastlane.tools/).
Fastlane is a powerful engine which handles a number of tasks like dealing with code signing, creating `.ipa` files, generating screenshots to AppStore and much more. One of the cool feature of Fastlane is a Slack integration - and this is what I wanted to write about.


# 💪 Motivation 💪

In Bright Inventions, I'm working on a few projects. Every project that we start, we start with the few basic steps: create a new repository, basic application setup and most important... Continous Integration. On iOS applications, it starts from installing the Fastlane, creating some lanes in Fastfile, then pushing it to our new repository. Next step is configuring a new TeamCity(a tool that we are using for CI) with new agent machine for the project. And after that... our CI build system is ready to collect changes from repository and trigger a build for our clients, or just build the application and run our unit/UI tests to check if everything working fine.

But what if something went wrong...

![](/images/slack-fastlane/error.jpg){: .center-image}

Let's say that we were doing some code refactoring, we committed the changes and pushed into our repository. Next, our build system discovers that are available new commits on repository - so it starts to build them and run unit tests. And here some tests failed.

![](/images/slack-fastlane/test-failed.png){: .center-image}


Of course, I don't have a constantly openned browser to check on the Teamcity site if everything went well when I pushed something to the repository. I want to be informed if something goes wrong like - failed unit tests or timeout or compilation error happen. And here is the key-word INFORMED -  How our build agent can inform us about occurred error?

### Emails

![](/images/slack-fastlane/email.jpeg){: .center-image}

We use email client which is built-in into TeamCity service. Every build lane has a rule which says 'send email to all developers when something goes wrong and build fails'. This solution working fine and it's commonly used in many projects and companies. But personally, I'm not 100% satisfied with that solution. If you are working in several projects, you get more and more emails from clients, Jira, team etc. And let's add to that a getting new emails from our TeamCity service. Of course, I can create filters and group all whole stuff(which I did), but even then it's too much for me. Besides, there is a new thing - if some builds failed - in most cases, it is important to **fix it quick**. So I prefer another - quickest in my opinion - way to be notified if something bad happened.


# ❤️ Fastlane + Slack ❤️

## 1. Create your Fastfile in right way

Let's consider a simple example. One lane which compiles the project and runs the unit tests:


```ruby
platform :ios do
desc "Runs all the tests"
lane :test do
    begin
        test_lane()
    rescue => exception
        on_error(exception)
    end
end
end
```

As you can see the body of `:test` lane consist of `begin-rescue-end` structure. It is ruby specific construction. In `begin` you put some code that may fail. After the `rescue => exception` line you put the code that should be executed if something goes wrong. In our case, it will be `on_error(exception)` function. So the Fastfile should look like this:

```ruby
platform :ios do
    desc "Runs all the tests"
    lane :test do
        begin
            test_lane()
        rescue => exception
            on_error(exception)
        end
    end
end

### Methods

def test_lane
    cocoapods
    clear_derived_data
    scan(scheme: "YourProjectSchemeName", configuration: "Debug")
end

def on_error(exception)
    slack(
        message: "Some thing goes wrong",
        success: false,
        slack_url: "https://your slack incoming webhook url",
        attachment_properties: {
            fields: [
                {
                    title: "Build number",
                    value: ENV["BUILD_NUMBER"],
                },
                {
                    title: "Error message",
                    value: exception.to_s,
                    short: false
                }
            ]
        }
    )
end
```

## 2. Generate slack URL

 As you probably noticed `slack` method takes a `slack_url` parameter. But how can I get one?

### Create incoming webhook

 Go to [slack incoming weebhook webiste](https://my.slack.com/services/new/incoming-webhook/), login, and after that you will be able too se screen like this:

![](/images/slack-fastlane/webhook-slack-url.png){: .center-image}

Choose your channel (for test purposes, I recommend choosing a direct message to yourself). Click `Add incoming WebHooks integration`.
Next step is to copy the Webhook URL and use it as `slack_url`.

Of course, after you learn how it works, you can generate a URL for specially created Channel in your slack team.

![](/images/slack-fastlane/webhook-slack-url2.png){: .center-image}


## 3. Build Slack message in Fastfile

 First of all, [here](https://docs.fastlane.tools/actions/slack/) you can find a official documentation for Slack action in Fastlane tool. In this section, I'll try to give you a closer look on that.

 Code for that is really simple. Let's create a simple `slack_message` lane to test how it works.
 Put new lane in you Fastfile, and the just run

 `fastlane slack_message`,

 or if you using a bundler

 `bundle exec fastlane slack_message`.


```ruby
platform :ios do
    desc "Runs all the tests"
    lane :slack_message do
        slack(
            message: "App successfully uploaded to iTunesConnect.",
            success: true,
            slack_url: "https://your slack incoming webhook url"
        )
    end
end
```

This is how our message look like:

![](/images/slack-fastlane/basic-message.png){: .center-image}


As you can see by default you get an information about `Git Commit`, `Git Commit Hash`, `Lane`, `Result`, `Git Author`.

# 🔧 Customizing slack message 🔧

#### 👉 `message`

Simple key for creating a message which will be display in a first row in Slack message. This can be literally everything.

- `message: "App Successfully uploaded to iTunesConnect"`
- `message: "All tests have been successful"`
- `message: "Something went wrong"` - My favorite error message 😉

but try to make you slack message useful. As you can see above in my `Fastfile` I use a `begin-rescue` construction in ruby. It is very useful because you can use an exception passed as a parameter to and create some meaningful error message.

I assumed that all of you use and know [CococaPods](https://cocoapods.org/). Let's imagine situation that our `Podfile` has an typo

```ruby
platform :ios, '10.0'
inhibit_all_warnings!

target 'MyAppTarget' do
  use_frameworks!

  # Pods for CIM
  podd 'SnapKit' # <------- should fails because of `podd`
  pod 'Result'
end

```

Now create a lane in our `Fastfile` that will install our CocoaPods, and build the project.

```ruby
fastlane_version "2.54.1"

default_platform :ios

xcode_select ENV["XCODE_PATH"]

platform :ios do
    desc "Runs all the tests"
    lane :build_and_test do
        begin
            build_and_test_lane()
        rescue => exception
            on_error(exception)
        end
    end
end

def build_and_test_lane
    cocoapods
    clear_derived_data
    scan(scheme: "MyAppScheme", configuration: "Debug")
end

def on_error(exception)
        slack(
            message: "Lane failed with exception : #{exception}",
            success: false,
            slack_url: "https://slackurl",
        )
end
```

As you can see if something went wrong in `build_and_test_lane` method our script will get an `exception` and run the `on_error(exception)` method.
Let's try it by...

`fastlane build_and_test` or `bundle exec fastlane build_and_test`

wait some time.... and...🔔 🔔

![](/images/slack-fastlane/exception.png){: .center-image}

Now our message is meaningful and we know that our `Podfile` has some errors.


#### 👉  `deafult_payloads`

As we can read in the documentation:

> Don't add this key or pass nil if you want all the default payloads. The available default payloads are: `lane`, `test_result`, `git_branch`, `git_author`, `last_git_commit_message`, `last_git_commit_hash`.

Personally, I think they are very important information, but if you want to customize the message by removing some of those - you can look at this example:

```ruby
slack(
    message: "App successfully uploaded to iTunesConnect.",
    success: true,
    slack_url: "https://your slack incoming webhook url",
    default_payloads: [:git_branch, :last_git_commit_message]
)
```

Here is how a message with customized `default_payloads` looks like:

![](/images/slack-fastlane/default-payload-message.png){: .center-image}

#### 👉  `success`

You can also define is that message will be successful or not. Success messages can be used if your app was successfully uploaded to iTunesConnect or many more cases. I prefer to use success for only that case. Because I think I don't need to know about every successful build or every successful test run. All above examples were examples when `success` parameter was set to `true` (it is done by default.).

Second option is to set `success` to `false`, and the a message will look a bit different:

![](/images/slack-fastlane/message-fail.png){: .center-image}

The red color suggests that something went wrong and you have to fix is a great way to notify you about it.

#### 👉  `attachment_properties`

Here real customizing begins. By using this property you can add any field to your slack message. Let's say that you want to add `BUILD_NUMBER` and `URL` to artifacts.

```ruby
slack(
    message: "App successfully uploaded to iTunesConnect.",
    success: true,
    slack_url: "https://your slack incoming webhook url",
    default_payloads: [:git_branch, :last_git_commit_message],
    attachment_properties: {
        fields: [
            {
                title: "Build number",
                value: ENV["BUILD_NUMBER"],
            },
            {
                title: "Artifacts URL",
                value: "https://url-to-your-artifacts.com",
            }
        ]
    }
)
```

![](/images/slack-fastlane/message-with-custom-fields.png){: .center-image}

Another example... let's modify our `on_error(exception)` method.

```
def on_error(exception)
        slack(
            message: "Error occured!",
            success: false,
            slack_url: "https://slackurl",
            attachment_properties: {
                fields: [
                    {
                        title: "Error message",
                        value: exception
                    }
                ]
            }
        )
end
```

and here we've got a message 🔔🔔

![](/images/slack-fastlane/exception.png){: .center-image}

As you can see, now the error message is custom field.

#### 👉  other flags...

In this post, I focused, in my humble opinion, on most important keys which allows you to configure the slack message. Others are: `channel`, `message`, `use_webhook_configured_username_and_icon`, `icon_url`, `payload`. As I wrote above, more information about these keys you can find on [official documentation](https://docs.fastlane.tools/actions/slack/).

# 🎉 Conclusion 🎉

I ❤️  Fastlane tool. It helps all developers to save a lot of time while development process. I think - one of the puzzles of this process is a Continous Integration ***in the full sense of the word***. How do I understand the Continous Integration? As you can read about it on [wikipedia](https://en.wikipedia.org/wiki/Continuous_integration)

>In software engineering, continuous integration (CI) is the practice of merging all developer working copies to a shared mainline several times a day.

it 100% true, but for me, it is also a state when I as a developer can be notified by CI agent about successes and errors without special checking them before pushing changes to the repository. But please don't get me wrong. I don't recommend committing and pushing without compiling(because our CI agent inform us when something failed). I'm talking about situation when you have a number of projects that contains a number of tests (Yes, I assume you're writing tests 😉). And I think you don't want to run them every time before you will push new changes to the repository. That's why you configured whole CI stuff to avoid it. Lets CI agent does it for you. In most cases all the tests will succeed 😉), so you can work ***continuously***. But if somehow tests fail - let the CI agent ping you on a Slack 😉
Another thing, please remember that you can be informed about good things like: successfully uploaded `.ipa` to TestFlight.


Hope you like the post. If you have any questions or you simply have another different opinion - feel free to leave a comment. Below you can find a links that were used in this post.

👉  [CocoaPods](https://cocoapods.org)

👉  [Fastlane](https://fastlane.tools/)

👉  [Slack incoming webhooks](https://api.slack.com/incoming-webhooks)

👉  [Fastlane Slack action](https://docs.fastlane.tools/actions/slack/)

👉  [Continous Integration](https://www.google.com/search?q=continuous+integration)

👉  [TeamCity](https://www.jetbrains.com/teamcity/)